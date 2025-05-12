"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsModule = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const comments_gateway_1 = require("./comments.gateway");
const sequelize_1 = require("@nestjs/sequelize");
const comments_model_1 = require("./comments.model");
const auth_module_1 = require("../auth/auth.module");
const users_model_1 = require("../users/users.model");
const templates_model_1 = require("../templates/templates.model");
let CommentsModule = class CommentsModule {
};
exports.CommentsModule = CommentsModule;
exports.CommentsModule = CommentsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([comments_model_1.Comment, users_model_1.User, templates_model_1.Template]), auth_module_1.AuthModule],
        providers: [comments_service_1.CommentsService, comments_gateway_1.CommentsGateway],
    })
], CommentsModule);
//# sourceMappingURL=comments.module.js.map