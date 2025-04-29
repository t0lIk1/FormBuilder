import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/ws-jwt-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class CommentsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly commentsService: CommentsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('add_comment')
  async handleAddComment(
    @MessageBody() data: { templateId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log("comment")
    const comment = await this.commentsService.create(
      client.data.userId,
      data.templateId,
      data.content,
    );

    this.server.to(`template_${data.templateId}`).emit('new_comment', comment);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('get_comments')
  async handleGetComments(
    @MessageBody() templateId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`template_${templateId}`);

    const comments = await this.commentsService.getAllComments(templateId);
    console.log(comments);
    client.emit('comments_list', comments);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('delete_comment')
  async handleDeleteComment(
    @MessageBody() data: { commentId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const userId = client.data.userId;

      const result = await this.commentsService.deleteComment(
        data.commentId,
        userId,
      );

      if (result === 0) {
        throw new WsException(
          'Комментарий не найден или у вас нет прав на его удаление',
        );
      }

      const deletedComment = await this.commentsService.getCommentById(
        data.commentId,
      );

      if (deletedComment) {
        this.server
          .to(`template_${deletedComment.templateId}`)
          .emit('comment_deleted', data.commentId);
      }

      return { success: true };
    } catch (error) {
      throw new WsException(error.message);
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('edit_comment')
  async handleEditComment(
    @MessageBody() data: { commentId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;

    const updated = await this.commentsService.updateComment(
      data.commentId,
      userId,
      data.content,
    );

    if (!updated) {
      throw new WsException(
        'Комментарий не найден или у вас нет прав на редактирование',
      );
    }

    const updatedComment = await this.commentsService.getCommentById(data.commentId);

    if (updatedComment) {
      this.server
        .to(`template_${updatedComment.templateId}`)
        .emit('comment_updated', updatedComment);
    }

    return { success: true };
  }
}
