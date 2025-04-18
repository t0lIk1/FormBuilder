"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModule = void 0;
const common_1 = require("@nestjs/common");
const tags_service_1 = require("./tags.service");
const tags_model_1 = require("./tags.model");
const sequelize_1 = require("@nestjs/sequelize");
const templates_model_1 = require("../templates/templates.model");
const templates_tags_model_1 = require("./templates-tags.model");
let TagsModule = class TagsModule {
};
exports.TagsModule = TagsModule;
exports.TagsModule = TagsModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([tags_model_1.Tag, templates_model_1.Template, templates_tags_model_1.TemplateTag])],
        providers: [tags_service_1.TagsService],
        exports: [tags_service_1.TagsService],
    })
], TagsModule);
//# sourceMappingURL=tags.module.js.map