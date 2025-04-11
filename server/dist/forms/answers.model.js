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
exports.Answer = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const questions_model_1 = require("../questions/questions.model");
const forms_model_1 = require("./forms.model");
let Answer = class Answer extends sequelize_typescript_1.Model {
    formResponseId;
    formResponse;
    questionId;
    question;
    value;
};
exports.Answer = Answer;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Answer.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => forms_model_1.Form),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Answer.prototype, "formResponseId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => forms_model_1.Form),
    __metadata("design:type", forms_model_1.Form)
], Answer.prototype, "formResponse", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => questions_model_1.Question),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Answer.prototype, "questionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => questions_model_1.Question),
    __metadata("design:type", questions_model_1.Question)
], Answer.prototype, "question", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Answer.prototype, "value", void 0);
exports.Answer = Answer = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'answers' })
], Answer);
//# sourceMappingURL=answers.model.js.map