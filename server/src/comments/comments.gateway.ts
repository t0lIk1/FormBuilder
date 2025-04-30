import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from '../auth/ws-jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

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

  constructor(
    private commentsService: CommentsService,
    private jwtService: JwtService,
  ) {}

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
    const comment = await this.commentsService.create(
      client.data.userId,
      data.templateId,
      data.content,
    );

    this.server.to(`template_${data.templateId}`).emit('new_comment', comment);
  }

  @SubscribeMessage('get_comments')
  async handleGetComments(
    @MessageBody() templateId: number,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`template_${templateId}`);

    const comments = await this.commentsService.getAllComments(templateId);
    client.emit('comments_list', comments);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('delete_comment')
  async handleDeleteComment(
    @MessageBody() body: { commentId: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(body);
    const deleted = await this.commentsService.deleteComment(
      body.commentId,
      client.data.userId,
    );

    if (deleted) {
      this.server.emit('comment_deleted', body.commentId); // ⚠️ Вот это важно!
    }
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('edit_comment')
  async handleEditComment(
    @MessageBody() body: { commentId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const success = await this.commentsService.updateComment(
      body.commentId,
      client.data.userId,
      body.content,
    );

    if (success) {
      const updated = await this.commentsService.getCommentById(body.commentId);
      this.server.emit('comment_updated', updated); // Отправляем всем
    }
  }
}
