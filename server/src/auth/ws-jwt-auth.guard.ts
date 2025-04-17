// src/auth/ws-jwt-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface JwtPayload {
  id: number;
  // другие поля, которые могут быть в вашем токене
}

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client: Socket = context.switchToWs().getClient();
    const token = this.extractTokenFromHeader(client);

    if (!token) {
      throw new WsException('Unauthorized: No token provided');
    }
    try {
      const payload = this.jwtService.verify<JwtPayload>(token);

      // Добавляем userId к данным клиента для последующего использования
      client.data.userId = payload.id;
      return true;
    } catch (error) {
      throw new WsException('Unauthorized: Invalid token');
    }
  }

  private extractTokenFromHeader(client: Socket): string | undefined {
    const [type, token] = client.handshake.auth?.token?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
