"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsJwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let WsJwtAuthGuard = class WsJwtAuthGuard {
    canActivate(context) {
        if (context.getType() !== 'ws') {
            return true;
        }
        const client = context.switchToWs().getClient();
        const token = this.extractToken(client);
        if (!token) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
            client.user = payload;
            return true;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    extractToken(client) {
        if (client.handshake.auth?.token) {
            return client.handshake.auth.token;
        }
        const authHeader = client.handshake.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
            return authHeader.split(' ')[1];
        }
        return null;
    }
};
exports.WsJwtAuthGuard = WsJwtAuthGuard;
exports.WsJwtAuthGuard = WsJwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], WsJwtAuthGuard);
//# sourceMappingURL=ws-jwt-auth.guard.js.map