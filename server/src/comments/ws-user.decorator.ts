// src/auth/ws-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsJwtAuthGuard } from './ws-jwt-auth.guard';

export const WsUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const client = context.switchToWs().getClient();
    if (!(client as any).user) {
      throw new Error('WsJwtAuthGuard must be used before WsUser decorator');
    }
    return (client as any).user;
  },
);
