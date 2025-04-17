// src/comments/comments.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  WebSocketServer, WsException,
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
    const comment = await this.commentsService.create(
      client.data.userId,
      data.templateId,
      data.content,
    );

    // Отправляем всем клиентам, подписанным на этот templateId
    this.server.to(`template_${data.templateId}`).emit('new_comment', comment);
  }

  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('get_comments')
  async handleGetComments(
    @MessageBody() templateId: number,
    @ConnectedSocket() client: Socket,
  ) {
    // Подписываем клиента на комнату для этого шаблона
    client.join(`template_${templateId}`);

    const comments = await this.commentsService.getAllComments(templateId);
    client.emit('comments_list', comments);
  }

  // src/comments/comments.gateway.ts
  @UseGuards(WsJwtAuthGuard)
  @SubscribeMessage('delete_comment')
  async handleDeleteComment(
    @MessageBody() data: { commentId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // Получаем userId из данных клиента (установлено в WsJwtAuthGuard)
      const userId = client.data.userId;

      // Удаляем комментарий с проверкой прав
      const result = await this.commentsService.deleteComment(
        data.commentId,
        userId,
      );

      if (result === 0) {
        throw new WsException(
          'Комментарий не найден или у вас нет прав на его удаление',
        );
      }

      // Получаем информацию о комментарии для рассылки
      const deletedComment = await this.commentsService.getCommentById(
        data.commentId,
      );

      if (deletedComment) {
        // Уведомляем всех подписанных на этот шаблон
        this.server
          .to(`template_${deletedComment.templateId}`)
          .emit('comment_deleted', data.commentId);
      }

      return { success: true };
    } catch (error) {
      throw new WsException(error.message);
    }
  }
}
