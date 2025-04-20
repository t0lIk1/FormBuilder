"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const forms_service_1 = require("./forms.service");
const forms_controller_1 = require("./forms.controller");
const forms_model_1 = require("./forms.model");
const answers_model_1 = require("./answers.model");
const questions_model_1 = require("../questions/questions.model");
const templates_model_1 = require("../templates/templates.model");
const auth_module_1 = require("../auth/auth.module");
const answer_option_model_1 = require("./answer-option.model");
let FormsModule = class FormsModule {
};
exports.FormsModule = FormsModule;
exports.FormsModule = FormsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                forms_model_1.Form,
                answers_model_1.Answer,
                questions_model_1.Question,
                templates_model_1.Template,
                answer_option_model_1.AnswerOption,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [forms_controller_1.FormsController],
        providers: [forms_service_1.FormsService],
        exports: [forms_service_1.FormsService],
    })
], FormsModule);
//# sourceMappingURL=forms.module.js.map