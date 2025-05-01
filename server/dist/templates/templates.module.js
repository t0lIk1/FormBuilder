"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesModule = void 0;
const common_1 = require("@nestjs/common");
const templates_service_1 = require("./templates.service");
const templates_controller_1 = require("./templates.controller");
const templates_model_1 = require("./templates.model");
const sequelize_1 = require("@nestjs/sequelize");
const questions_model_1 = require("../questions/questions.model");
const users_model_1 = require("../users/users.model");
const auth_module_1 = require("../auth/auth.module");
const tags_model_1 = require("../tags/tags.model");
const templates_tags_model_1 = require("../tags/templates-tags.model");
const tags_module_1 = require("../tags/tags.module");
const template_likes_model_1 = require("./template-likes.model");
const questions_module_1 = require("../questions/questions.module");
const comments_model_1 = require("../comments/comments.model");
let TemplatesModule = class TemplatesModule {
};
exports.TemplatesModule = TemplatesModule;
exports.TemplatesModule = TemplatesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                questions_model_1.Question,
                templates_model_1.Template,
                users_model_1.User,
                tags_model_1.Tag,
                comments_model_1.Comment,
                templates_tags_model_1.TemplateTag,
                template_likes_model_1.TemplateLike,
            ]),
            auth_module_1.AuthModule,
            tags_module_1.TagsModule,
            questions_module_1.QuestionsModule,
        ],
        controllers: [templates_controller_1.TemplatesController],
        providers: [templates_service_1.TemplatesService],
        exports: [templates_service_1.TemplatesService],
    })
], TemplatesModule);
//# sourceMappingURL=templates.module.js.map