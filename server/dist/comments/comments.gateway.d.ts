import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from './comments.service';
import { JwtService } from '@nestjs/jwt';
export declare class CommentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private commentsService;
    private jwtService;
    server: Server;
    constructor(commentsService: CommentsService, jwtService: JwtService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleAddComment(data: {
        templateId: number;
        content: string;
    }, client: Socket): Promise<void>;
    handleGetComments(templateId: number, client: Socket): Promise<void>;
    handleDeleteComment(body: {
        commentId: number;
    }, client: Socket): Promise<void>;
    handleEditComment(body: {
        commentId: number;
        content: string;
    }, client: Socket): Promise<void>;
}
