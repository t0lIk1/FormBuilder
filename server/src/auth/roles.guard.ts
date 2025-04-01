import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

interface JwtPayload {
  role: string;
}

// Расширяем стандартный объект запроса, чтобы включить пользователя
interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // Получаем список ролей, которые необходимы для доступа к этому эндпоинту
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Если роли не указаны, доступ разрешён для всех
    if (!requiredRoles) return true;

    // Получаем объект запроса
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'];

    // Проверяем, есть ли заголовок авторизации
    if (!authHeader) {
      throw new UnauthorizedException('Отсутствует заголовок авторизации');
    }

    // Разделяем заголовок на две части: "Bearer" и сам токен
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Некорректный формат токена');
    }

    try {
      const user = this.jwtService.verify<JwtPayload>(token);
      request.user = user;

      if (!user.role) {
        throw new UnauthorizedException('Некорректные данные роли');
      }

      return requiredRoles.includes(user.role);
    } catch (error) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : 'Пользователь не авторизован',
      );
    }
  }
}
