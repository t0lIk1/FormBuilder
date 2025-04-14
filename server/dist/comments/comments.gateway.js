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
const ws_jwt_auth_guard_1 = require("./ws-jwt-auth.guard");
const ws_user_decorator_1 = require("./ws-user.decorator");
let CommentsGateway = class CommentsGateway {
    commentsService;
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    async handleAddComment(data, client, user) {
        const comment = await this.commentsService.create(user.userId, data.templateId, data.content);
        client.broadcast.emit('new_comment', comment);
        client.emit('new_comment', comment);
    }
    async handleGetComments(templateId, client) {
        const comments = await this.commentsService.getAllComments(templateId);
        client.emit('comments_list', comments);
    }
};
exports.CommentsGateway = CommentsGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('add_comment'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __param(2, (0, ws_user_decorator_1.WsUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], CommentsGateway.prototype, "handleAddComment", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('get_comments'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], CommentsGateway.prototype, "handleGetComments", null);
exports.CommentsGateway = CommentsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    (0, common_1.UseGuards)(ws_jwt_auth_guard_1.WsJwtAuthGuard),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsGateway);
//# sourceMappingURL=comments.gateway.js.map