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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const questions_model_1 = require("./questions.model");
const templates_model_1 = require("../templates/templates.model");
let QuestionsService = class QuestionsService {
    questionRepository;
    templatesRepository;
    constructor(questionRepository, templatesRepository) {
        this.questionRepository = questionRepository;
        this.templatesRepository = templatesRepository;
    }
    async create(templateId, dto) {
        const template = await this.templatesRepository.findByPk(templateId);
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        const maxOrder = await this.questionRepository.max('order', {
            where: { templateId },
        });
        const newOrder = typeof maxOrder === 'number' ? maxOrder + 1 : 1;
        return this.questionRepository.create({
            ...dto,
            templateId,
            order: newOrder,
        });
    }
    async findAllByTemplate(templateId) {
        return this.questionRepository.findAll({
            where: { templateId },
            order: [['order', 'ASC']],
        });
    }
    async findOne(templateId, id) {
        const question = await this.questionRepository.findOne({
            where: { id, templateId },
        });
        if (!question)
            throw new common_1.NotFoundException('Question not found');
        return question;
    }
    async update(templateId, id, dto) {
        const question = await this.findOne(templateId, id);
        return question.update(dto);
    }
    async remove(templateId, id) {
        const question = await this.findOne(templateId, id);
        await question.destroy();
        await this.reorderAfterDelete(templateId);
    }
    async reorder(templateId, dto) {
        const updates = dto.orderedIds.map((id, index) => this.questionRepository.update({ order: index }, { where: { id, templateId } }));
        return Promise.all(updates);
    }
    async reorderAfterDelete(templateId) {
        const questions = await this.questionRepository.findAll({
            where: { templateId },
            order: [['order', 'ASC']],
        });
        const updates = questions.map((q, index) => this.questionRepository.update({ order: index }, { where: { id: q.id } }));
        await Promise.all(updates);
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(questions_model_1.Question)),
    __param(1, (0, sequelize_1.InjectModel)(templates_model_1.Templates)),
    __metadata("design:paramtypes", [Object, Object])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map