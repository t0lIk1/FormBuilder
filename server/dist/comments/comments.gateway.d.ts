import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CommentsService } from './comments.service';
export declare class CommentsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleAddComment(data: {
        templateId: number;
        content: string;
    }, client: Socket, user: {
        userId: number;
    }): Promise<void>;
    handleGetComments(templateId: number, client: Socket): Promise<void>;
}
