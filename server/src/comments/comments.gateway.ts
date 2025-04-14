// src/comments/comments.gateway.ts
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CommentsService } from './comments.service';
import { UseGuards } from '@nestjs/common';
import { WsJwtAuthGuard } from './ws-jwt-auth.guard';
import { WsUser } from './ws-user.decorator';

@WebSocketGateway({ cors: true })
@UseGuards(WsJwtAuthGuard) // Apply guard to all gateway methods
export class CommentsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly commentsService: CommentsService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('add_comment')
  async handleAddComment(
    @MessageBody() data: { templateId: number; content: string },
    @ConnectedSocket() client: Socket,
    @WsUser() user: { userId: number }, // Get user from token
  ) {
    const comment = await this.commentsService.create(
      user.userId, // Use userId from token
      data.templateId,
      data.content,
    );

    // Broadcast to all clients except sender
    client.broadcast.emit('new_comment', comment);
    // Send to sender
    client.emit('new_comment', comment);
  }

  // src/comments/comments.gateway.ts
  @SubscribeMessage('get_comments')
  async handleGetComments(
    @MessageBody() templateId: number,
    @ConnectedSocket() client: Socket,
  ) {
    const comments = await this.commentsService.getAllComments(templateId);
    client.emit('comments_list', comments); // Отправляем только запросившему клиенту
  }
}
