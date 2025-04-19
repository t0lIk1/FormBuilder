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
const tags_service_1 = require("../tags/tags.service");
const template_likes_model_1 = require("./template-likes.model");
const tags_model_1 = require("../tags/tags.model");
const templates_tags_model_1 = require("../tags/templates-tags.model");
let TemplatesService = class TemplatesService {
    templateRepository;
    questionRepository;
    templateLikeRepository;
    tagsService;
    constructor(templateRepository, questionRepository, templateLikeRepository, tagsService) {
        this.templateRepository = templateRepository;
        this.questionRepository = questionRepository;
        this.templateLikeRepository = templateLikeRepository;
        this.tagsService = tagsService;
    }
    async create(dto, tagNames) {
        const template = await this.templateRepository.create(dto);
        const tags = await this.tagsService.findOrCreate(tagNames);
        await template.$set('tags', tags);
    }
    async findAll() {
        return await this.templateRepository.findAll({
            include: [
                questions_model_1.Question,
                {
                    model: tags_model_1.Tag,
                    through: { attributes: [] },
                },
                {
                    model: template_likes_model_1.TemplateLike,
                    required: false,
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }
    async findOne(id) {
        const template = await this.templateRepository.findByPk(id, {
            include: [questions_model_1.Question, tags_model_1.Tag, templates_tags_model_1.TemplateTag, template_likes_model_1.TemplateLike],
        });
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        return template;
    }
    async update(id, dto, tagNames) {
        const template = await this.templateRepository.findByPk(id);
        if (!template)
            throw new common_1.NotFoundException('Template not found');
        const updateTemplate = await template.update(dto);
        if (tagNames) {
            const tags = await this.tagsService.findOrCreate(tagNames);
            await updateTemplate.$set('tags', tags);
        }
        else {
            await updateTemplate.$set('tags', []);
        }
        return updateTemplate;
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
    async toggleLike(templateId, userId) {
        const existingLike = await this.templateLikeRepository.findOne({
            where: { templateId, userId },
        });
        if (existingLike) {
            await existingLike.destroy();
            return { liked: false };
        }
        else {
            await this.templateLikeRepository.create({ templateId, userId });
            return { liked: true };
        }
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(templates_model_1.Template)),
    __param(1, (0, sequelize_1.InjectModel)(questions_model_1.Question)),
    __param(2, (0, sequelize_1.InjectModel)(template_likes_model_1.TemplateLike)),
    __metadata("design:paramtypes", [Object, Object, Object, tags_service_1.TagsService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map