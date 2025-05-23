"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const questions_controller_1 = require("./questions.controller");
const sequelize_1 = require("@nestjs/sequelize");
const questions_model_1 = require("./questions.model");
const templates_model_1 = require("../templates/templates.model");
const auth_module_1 = require("../auth/auth.module");
const templates_module_1 = require("../templates/templates.module");
const answers_model_1 = require("../forms/answers.model");
let QuestionsModule = class QuestionsModule {
};
exports.QuestionsModule = QuestionsModule;
exports.QuestionsModule = QuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([questions_model_1.Question, templates_model_1.Template, answers_model_1.Answer]),
            auth_module_1.AuthModule,
            (0, common_1.forwardRef)(() => templates_module_1.TemplatesModule),
        ],
        controllers: [questions_controller_1.QuestionsController],
        providers: [questions_service_1.QuestionsService],
        exports: [questions_service_1.QuestionsService],
    })
], QuestionsModule);
//# sourceMappingURL=questions.module.js.map