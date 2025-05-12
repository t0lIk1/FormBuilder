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
const submit_form_dto_1 = require("./dto/submit-form.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let FormsController = class FormsController {
    formsService;
    constructor(formsService) {
        this.formsService = formsService;
    }
    async submitForm(dto, req, templateId) {
        const user = req.user;
        return this.formsService.submitForm({
            ...dto,
            userId: user.id,
        }, templateId);
    }
    getFormResponse(id) {
        return this.formsService.getFormResponse(id);
    }
    getUserResponses(req) {
        const user = req.user;
        return this.formsService.getUserResponses(user.id);
    }
    getTemplateResponses(templateId) {
        return this.formsService.getTemplateResponses(templateId);
    }
    async updateFormResponse(id, dto, req) {
        const user = req.user;
        return this.formsService.updateFormResponse(id, dto, user.id);
    }
};
exports.FormsController = FormsController;
__decorate([
    (0, common_1.Post)('/templates/:templateId/submit'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('templateId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_form_dto_1.SubmitFormDto, Object, Number]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "submitForm", null);
__decorate([
    (0, common_1.Get)('responses/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormsController.prototype, "getFormResponse", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FormsController.prototype, "getUserResponses", null);
__decorate([
    (0, common_1.Get)('template-responses'),
    __param(0, (0, common_1.Param)('templateId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FormsController.prototype, "getTemplateResponses", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, submit_form_dto_1.SubmitFormDto, Object]),
    __metadata("design:returntype", Promise)
], FormsController.prototype, "updateFormResponse", null);
exports.FormsController = FormsController = __decorate([
    (0, common_1.Controller)('forms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [forms_service_1.FormsService])
], FormsController);
//# sourceMappingURL=forms.controller.js.map