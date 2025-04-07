import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';

@Injectable()
export class AccessTemplatesGuard implements CanActivate {
  constructor(private readonly templatesService: TemplatesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user?: { id: number; role: string };
      params: { id: string };
    }>();

    const templateId = request.params.id;
    if (!templateId || isNaN(Number(templateId))) {
      throw new NotFoundException('Incorrect template id');
    }

    const template = await this.templatesService.findOne(Number(templateId));
    if (!template) {
      throw new NotFoundException('Template not found');
    }

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Access denied: you are not logged in');
    }

    if (template.userId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Access denied: you do not have permission for this template',
      );
    }

    return true;
  }
}
