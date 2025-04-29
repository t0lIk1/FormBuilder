import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CommentsService } from './comments.service';
export declare class CommentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly commentsService;
    server: Server;
    constructor(commentsService: CommentsService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleAddComment(data: {
        templateId: number;
        content: string;
    }, client: Socket): Promise<void>;
    handleGetComments(templateId: number, client: Socket): Promise<void>;
    handleDeleteComment(data: {
        commentId: number;
    }, client: Socket): Promise<{
        success: boolean;
    }>;
    handleEditComment(data: {
        commentId: number;
        content: string;
    }, client: Socket): Promise<{
        success: boolean;
    }>;
}
