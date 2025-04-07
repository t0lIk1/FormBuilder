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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTemplatesGuard = void 0;
const common_1 = require("@nestjs/common");
const templates_service_1 = require("./templates.service");
let AccessTemplatesGuard = class AccessTemplatesGuard {
    templatesService;
    constructor(templatesService) {
        this.templatesService = templatesService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const templateId = request.params.id;
        if (!templateId || isNaN(Number(templateId))) {
            throw new common_1.NotFoundException('Incorrect template id');
        }
        const template = await this.templatesService.findOne(Number(templateId));
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        const user = request.user;
        if (!user) {
            throw new common_1.ForbiddenException('Access denied: you are not logged in');
        }
        if (template.userId !== user.id && user.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Access denied: you do not have permission for this template');
        }
        return true;
    }
};
exports.AccessTemplatesGuard = AccessTemplatesGuard;
exports.AccessTemplatesGuard = AccessTemplatesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [templates_service_1.TemplatesService])
], AccessTemplatesGuard);
//# sourceMappingURL=access-templates.guard.js.map