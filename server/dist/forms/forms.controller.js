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
exports.FormsController = void 0;
const common_1 = require("@nestjs/common");
const forms_service_1 = require("./forms.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FormsController = class FormsController {
    formsService;
    constructor(formsService) {
        this.formsService = formsService;
    }
    async submitForm(dto, req, templateId) {
        return this.formsService.submitForm({
            templateId: Number(templateId),
            ...dto,
            userId: req.user.id,
        });
    }
    async getFormResponse(id) {
        return this.formsService.getFormResponse(Number(id));
    }
    async getUserResponses(req) {
        return this.formsService.getUserResponses(req.user.id);
    }
    async getTemplateResponses(templateId) {
        return this.formsService.getTemplateResponses(Number(templateId));
    }
};
exports.FormsController = FormsController;
__decorate([
    (0, common_1.Post)('submit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Number]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "submitForm", null);
__decorate([
    (0, common_1.Get)('responses/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "getFormResponse", null);
__decorate([
    (0, common_1.Get)('my-responses'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "getUserResponses", null);
__decorate([
    (0, common_1.Get)('template-responses'),
    __param(0, (0, common_1.Param)('templateId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "getTemplateResponses", null);
exports.FormsController = FormsController = __decorate([
    (0, common_1.Controller)('templates/:templateId/forms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [forms_service_1.FormsService])
], FormsController);
//# sourceMappingURL=forms.controller.js.map