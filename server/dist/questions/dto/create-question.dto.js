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
exports.CreateQuestionDto = void 0;
const class_validator_1 = require("class-validator");
const questions_model_1 = require("../questions.model");
class CreateQuestionDto {
    question;
    description;
    type;
    isRequired;
    options;
}
exports.CreateQuestionDto = CreateQuestionDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Текст вопроса обязателен' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(questions_model_1.QuestionType, { message: 'Недопустимый тип вопроса' }),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)({ message: 'isRequired должно быть boolean' }),
    __metadata("design:type", Boolean)
], CreateQuestionDto.prototype, "isRequired", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.type === questions_model_1.QuestionType.SELECT),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Для SELECT-вопроса нужен хотя бы один вариант' }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
//# sourceMappingURL=create-question.dto.js.map