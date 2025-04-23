import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { Template } from './templates.model';

@Injectable()
export class AccessTemplatesGuard implements CanActivate {
  constructor(private readonly templatesService: TemplatesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      template: Template;
      user?: { id: number; role: string };
      params: { id?: string; templateId?: string };
    }>();

    // Получаем ID шаблона из разных возможных параметров
    const templateId = request.params.templateId || request.params.id;
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

    if (template.authorId !== user.id && user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Access denied: you do not have permission for this template',
      );
    }

    request.template = template;
    return true;
  }
}
