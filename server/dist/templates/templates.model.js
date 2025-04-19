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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
const questions_model_1 = require("../questions/questions.model");
const forms_model_1 = require("../forms/forms.model");
const tags_model_1 = require("../tags/tags.model");
const templates_tags_model_1 = require("../tags/templates-tags.model");
const template_likes_model_1 = require("./template-likes.model");
let Template = class Template extends sequelize_typescript_1.Model {
    title;
    description;
    topic;
    isPublic;
    userId;
    user;
    questions;
    forms;
    tags;
    likes;
};
exports.Template = Template;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Template.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Template.prototype, "title", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Template.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], Template.prototype, "topic", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, allowNull: false, defaultValue: false }),
    __metadata("design:type", Boolean)
], Template.prototype, "isPublic", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false }),
    __metadata("design:type", Number)
], Template.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Template.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => questions_model_1.Question),
    __metadata("design:type", Array)
], Template.prototype, "questions", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => forms_model_1.Form),
    __metadata("design:type", Array)
], Template.prototype, "forms", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => tags_model_1.Tag, () => templates_tags_model_1.TemplateTag),
    __metadata("design:type", Array)
], Template.prototype, "tags", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => template_likes_model_1.TemplateLike),
    __metadata("design:type", Array)
], Template.prototype, "likes", void 0);
exports.Template = Template = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'templates' })
], Template);
//# sourceMappingURL=templates.model.js.map