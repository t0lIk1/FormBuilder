"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const comments_service_1 = require("./comments.service");
const common_1 = require("@nestjs/common");
const ws_jwt_auth_guard_1 = require("../auth/ws-jwt-auth.guard");
let CommentsGateway = class CommentsGateway {
    commentsService;
    server;
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleAddComment(data, client) {
        const comment = await this.commentsService.create(client.data.userId, data.templateId, data.content);
        this.server.to(`template_${data.templateId}`).emit('new_comment', comment);
    }
    async handleGetComments(templateId, client) {
        client.join(`template_${templateId}`);
        const comments = await this.commentsService.getAllComments(templateId);
        client.emit('comments_list', comments);
    }
    async handleDeleteComment(data, client) {
        try {
            const userId = client.data.userId;
            const result = await this.commentsService.deleteComment(data.commentId, userId);
            if (result === 0) {
                throw new websockets_1.WsException('Комментарий не найден или у вас нет прав на его удаление');
            }
            const deletedComment = await this.commentsService.getCommentById(data.commentId);
            if (deletedComment) {
                this.server
                    .to(`template_${deletedComment.templateId}`)
                    .emit('comment_deleted', data.commentId);
            }
            return { success: true };
        }
        catch (error) {
            throw new websockets_1.WsException(error.message);
        }
    }
};
exports.CommentsGateway = CommentsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CommentsGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('add_comment'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentsGateway.prototype, "handleAddComment", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('get_comments'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentsGateway.prototype, "handleGetComments", null);
__decorate([
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    (0, websockets_1.SubscribeMessage)('delete_comment'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentsGateway.prototype, "handleDeleteComment", null);
exports.CommentsGateway = CommentsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsGateway);
//# sourceMappingURL=comments.gateway.js.map