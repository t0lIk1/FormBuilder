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
exports.TemplatesController = void 0;
const common_1 = require("@nestjs/common");
const templates_service_1 = require("./templates.service");
const create_template_dto_1 = require("./dto/create-template.dto");
const access_templates_guard_1 = require("./access-templates.guard");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TemplatesController = class TemplatesController {
    templatesService;
    constructor(templatesService) {
        this.templatesService = templatesService;
    }
    create(dto, req) {
        const user = req.user;
        const { tags, ...templateDto } = dto;
        return this.templatesService.create({ ...templateDto, userId: user.id }, tags);
    }
    findAll() {
        return this.templatesService.findAll();
    }
    findOne(id) {
        return this.templatesService.findOne(id);
    }
    update(id, dto) {
        const { tags, ...templateDto } = dto;
        return this.templatesService.update(id, templateDto, tags);
    }
    remove(id) {
        return this.templatesService.remove(id);
    }
    getTemplateQuestions(id) {
        return this.templatesService.getTemplateQuestions(id);
    }
    async toggleLike(id, req) {
        const user = req.user;
        return this.templatesService.toggleLike(id, user.id);
    }
};
exports.TemplatesController = TemplatesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_template_dto_1.CreateTemplateDto, Object]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, access_templates_guard_1.AccessTemplatesGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_template_dto_1.CreateTemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, access_templates_guard_1.AccessTemplatesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, access_templates_guard_1.AccessTemplatesGuard),
    (0, common_1.Get)(':id/questions'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "getTemplateQuestions", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/toggle-like'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], TemplatesController.prototype, "toggleLike", null);
exports.TemplatesController = TemplatesController = __decorate([
    (0, common_1.Controller)('templates'),
    __metadata("design:paramtypes", [templates_service_1.TemplatesService])
], TemplatesController);
//# sourceMappingURL=templates.controller.js.map