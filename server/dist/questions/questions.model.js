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
exports.Question = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const templates_model_1 = require("../templates/templates.model");
const answers_model_1 = require("../forms/answers.model");
const enum_1 = require("../types/enum");
let Question = class Question extends sequelize_typescript_1.Model {
    question;
    description;
    type;
    isRequired;
    order;
    showInTable;
    templateId;
    template;
    answers;
};
exports.Question = Question;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Question.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 1000],
        },
    }),
    __metadata("design:type", String)
], Question.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(500),
    }),
    __metadata("design:type", String)
], Question.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM(...Object.values(enum_1.QuestionType)),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Question.prototype, "type", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Question.prototype, "isRequired", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0,
        },
    }),
    __metadata("design:type", Number)
], Question.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    __metadata("design:type", Boolean)
], Question.prototype, "showInTable", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => templates_model_1.Templates),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Question.prototype, "templateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => templates_model_1.Templates),
    __metadata("design:type", templates_model_1.Templates)
], Question.prototype, "template", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answers_model_1.Answer),
    __metadata("design:type", Array)
], Question.prototype, "answers", void 0);
exports.Question = Question = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'questions' })
], Question);
//# sourceMappingURL=questions.model.js.map