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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const comments_model_1 = require("./comments.model");
const users_model_1 = require("../users/users.model");
const templates_model_1 = require("../templates/templates.model");
let CommentsService = class CommentsService {
    commentRepository;
    userRepository;
    templateRepository;
    constructor(commentRepository, userRepository, templateRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.templateRepository = templateRepository;
    }
    async create(userId, templateId, content) {
        const template = await this.templateRepository.findByPk(templateId);
        if (!template) {
            throw new common_1.NotFoundException('Template not found');
        }
        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.commentRepository.create({ userId, templateId, content });
    }
    async getAllComments(templateId) {
        return await this.commentRepository.findAll({
            where: { templateId },
            include: { model: users_model_1.User, attributes: ['id', 'name'] },
            order: [['createdAt', 'ASC']],
        });
    }
    async getCommentById(commentId) {
        return await this.commentRepository.findByPk(commentId);
    }
    async deleteComment(commentId, userId) {
        return await this.commentRepository.destroy({
            where: {
                id: commentId,
                userId: userId,
            },
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(comments_model_1.Comment)),
    __param(1, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __param(2, (0, sequelize_1.InjectModel)(templates_model_1.Template)),
    __metadata("design:paramtypes", [Object, Object, Object])
], CommentsService);
//# sourceMappingURL=comments.service.js.map