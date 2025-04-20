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
exports.AnswerOption = void 0;
const answers_model_1 = require("./answers.model");
const questions_model_1 = require("../questions/questions.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let AnswerOption = class AnswerOption extends sequelize_typescript_1.Model {
    questionId;
    question;
    text;
    answerId;
    answer;
};
exports.AnswerOption = AnswerOption;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], AnswerOption.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => questions_model_1.Question),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], AnswerOption.prototype, "questionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => questions_model_1.Question),
    __metadata("design:type", questions_model_1.Question)
], AnswerOption.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], AnswerOption.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => answers_model_1.Answer),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
    }),
    __metadata("design:type", Number)
], AnswerOption.prototype, "answerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => answers_model_1.Answer),
    __metadata("design:type", answers_model_1.Answer)
], AnswerOption.prototype, "answer", void 0);
exports.AnswerOption = AnswerOption = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'answer_options' })
], AnswerOption);
//# sourceMappingURL=answer-option.model.js.map