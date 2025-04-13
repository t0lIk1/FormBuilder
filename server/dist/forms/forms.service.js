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
exports.FormsService = void 0;
const sequelize_1 = require("@nestjs/sequelize");
const common_1 = require("@nestjs/common");
const forms_model_1 = require("./forms.model");
const answers_model_1 = require("./answers.model");
const questions_model_1 = require("../questions/questions.model");
const templates_model_1 = require("../templates/templates.model");
const enum_1 = require("../types/enum");
let FormsService = class FormsService {
    formRepository;
    answerRepository;
    questionRepository;
    templateRepository;
    constructor(formRepository, answerRepository, questionRepository, templateRepository) {
        this.formRepository = formRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.templateRepository = templateRepository;
    }
    async submitForm(dto) {
        const template = await this.templateRepository.findByPk(dto.templateId);
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        const requiredQuestionIds = (await this.questionRepository.findAll({
            where: {
                templateId: dto.templateId,
                isRequired: true,
            },
            attributes: ['id'],
        })).map((q) => q.id);
        const answeredQuestionIds = dto.answers.map((a) => a.questionId);
        const allRequiredAnswered = requiredQuestionIds.every((id) => answeredQuestionIds.includes(id));
        if (!allRequiredAnswered) {
            throw new common_1.NotFoundException('There are no answers to the required questions.');
        }
        const questions = await this.questionRepository.findAll({
            where: {
                id: answeredQuestionIds,
                templateId: dto.templateId,
            },
        });
        if (questions.length !== answeredQuestionIds.length) {
            throw new common_1.NotFoundException('Some answered questions do not belong to the selected template');
        }
        for (const answer of dto.answers) {
            const question = questions.find((q) => q.id === answer.questionId);
            if (!question) {
                throw new common_1.NotFoundException(`Question with ID ${answer.questionId} not found`);
            }
            if (!this.validateAnswer(answer.value, question.dataValues.type)) {
                throw new common_1.NotFoundException(`Invalid answer value for question ID ${answer.questionId} (expected ${question.type}, got ${answer.value})`);
            }
        }
        const form = await this.formRepository.create({
            templateId: dto.templateId,
            userId: dto.userId,
        });
        const answers = dto.answers.map((answer) => ({
            formId: form.id,
            questionId: answer.questionId,
            value: answer.value,
        }));
        await this.answerRepository.bulkCreate(answers, {
            returning: true,
        });
        return await this.getFormResponse(form.id);
    }
    async getFormResponse(id) {
        const form = await this.formRepository.findByPk(id, {
            include: [
                {
                    model: answers_model_1.Answer,
                    include: [questions_model_1.Question],
                },
                templates_model_1.Templates,
            ],
        });
        if (!form) {
            throw new common_1.NotFoundException('Form response not found');
        }
        return form;
    }
    async getUserResponses(userId) {
        return this.formRepository.findAll({
            where: { userId },
            include: [
                {
                    model: answers_model_1.Answer,
                    include: [questions_model_1.Question],
                },
                templates_model_1.Templates,
            ],
            order: [['submittedAt', 'DESC']],
        });
    }
    async getTemplateResponses(templateId) {
        return this.formRepository.findAll({
            where: { templateId },
            include: [
                {
                    model: answers_model_1.Answer,
                    include: [questions_model_1.Question],
                },
                templates_model_1.Templates,
            ],
            order: [['submittedAt', 'DESC']],
        });
    }
    validateAnswer(value, type) {
        console.log(type);
        console.log(value);
        switch (type) {
            case enum_1.QuestionType.TEXT:
            case enum_1.QuestionType.TEXTAREA:
                return typeof value === 'string';
            case enum_1.QuestionType.NUMBER:
                return !isNaN(Number(value));
            case enum_1.QuestionType.CHECKBOX:
                return typeof value === 'boolean';
            default:
                return false;
        }
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(forms_model_1.Form)),
    __param(1, (0, sequelize_1.InjectModel)(answers_model_1.Answer)),
    __param(2, (0, sequelize_1.InjectModel)(questions_model_1.Question)),
    __param(3, (0, sequelize_1.InjectModel)(templates_model_1.Templates)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], FormsService);
//# sourceMappingURL=forms.service.js.map