import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TemplatesService } from './templates.service';
export declare class AccessTemplatesGuard implements CanActivate {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
