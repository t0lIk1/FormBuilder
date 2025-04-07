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
exports.TemplatesService = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const templates_model_1 = require("./templates.model");
const questions_model_1 = require("../questions/questions.model");
let TemplatesService = class TemplatesService {
    templateRepository;
    questionRepository;
    constructor(templateRepository, questionRepository) {
        this.templateRepository = templateRepository;
        this.questionRepository = questionRepository;
    }
    async create(dto) {
        return this.templateRepository.create(dto);
    }
    async findAll() {
        return this.templateRepository.findAll({
            include: [questions_model_1.Question],
            order: [['createdAt', 'DESC']],
        });
    }
    async findOne(id) {
        const template = await this.templateRepository.findByPk(id, {
            include: [questions_model_1.Question],
        });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async update(id, dto) {
        const template = await this.templateRepository.findByPk(id);
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template.update(dto);
    }
    async remove(id) {
        const template = await this.templateRepository.findByPk(id);
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        await this.questionRepository.destroy({ where: { templateId: id } });
        return template.destroy();
    }
    async getTemplateQuestions(id) {
        const template = await this.templateRepository.findByPk(id);
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return this.questionRepository.findAll({
            where: { templateId: id },
            order: [['order', 'ASC']],
        });
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(templates_model_1.Templates)),
    __param(1, (0, sequelize_1.InjectModel)(questions_model_1.Question)),
    __metadata("design:paramtypes", [Object, Object])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map