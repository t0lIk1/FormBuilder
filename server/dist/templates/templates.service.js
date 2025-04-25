"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const Fuse = __importStar(require("fuse.js"));
const users_model_1 = require("../users/users.model");
const questions_service_1 = require("../questions/questions.service");
let TemplatesService = class TemplatesService {
    templateRepository;
    questionRepository;
    userRepository;
    templateLikeRepository;
    tagsService;
    questionsService;
    constructor(templateRepository, questionRepository, userRepository, templateLikeRepository, tagsService, questionsService) {
        this.templateRepository = templateRepository;
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.templateLikeRepository = templateLikeRepository;
        this.tagsService = tagsService;
        this.questionsService = questionsService;
    }
    async create(dto, tagNames) {
        const author = await this.userRepository.findByPk(dto.authorId);
        if (!author) {
            throw new common_1.NotFoundException('User not found');
        }
        const template = await this.templateRepository.create({
            ...dto,
            authorName: author.dataValues.name,
        });
        const tags = await this.tagsService.findOrCreate(tagNames);
        await template.$set('tags', tags);
        if (dto.questions?.length) {
            for (const questionDto of dto.questions) {
                await this.questionsService.create(template.id, questionDto);
            }
        }
        return this.templateRepository.findByPk(template.id, {
            include: [tags_model_1.Tag, questions_model_1.Question],
        });
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
    async findAllByUser(userId) {
        return await this.templateRepository.findAll({
            where: { authorId: userId },
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
            include: { all: true },
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
    async searchTemplates(query) {
        if (!query || query.trim() === '') {
            return this.findAll();
        }
        console.log(query, 'query');
        const templates = await this.templateRepository.findAll({
            include: [
                questions_model_1.Question,
                { model: tags_model_1.Tag },
                { model: template_likes_model_1.TemplateLike, required: false },
            ],
        });
        console.log(templates);
        const options = {
            keys: [
                { name: 'dataValues.title', weight: 0.6 },
                { name: 'dataValues.description', weight: 0.2 },
                { name: 'dataValues.topic', weight: 0.1 },
                { name: 'dataValues.tags[0].name', weight: 0.4 },
            ],
            includeScore: true,
            threshold: 0.5,
            minMatchCharLength: 3,
            ignoreLocation: true,
            shouldSort: true,
            findAllMatches: false,
            ignoreCase: true,
        };
        console.log(options);
        const fuse = new Fuse.default(templates, options);
        const results = fuse.search(query);
        console.log(results);
        const sortedResults = results
            .sort((a, b) => (a.score || 1) - (b.score || 1))
            .map((result) => result.item);
        return sortedResults;
    }
};
exports.TemplatesService = TemplatesService;
exports.TemplatesService = TemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(templates_model_1.Template)),
    __param(1, (0, sequelize_1.InjectModel)(questions_model_1.Question)),
    __param(2, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(3, (0, sequelize_1.InjectModel)(template_likes_model_1.TemplateLike)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, tags_service_1.TagsService,
        questions_service_1.QuestionsService])
], TemplatesService);
//# sourceMappingURL=templates.service.js.map