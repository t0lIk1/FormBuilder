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
exports.TemplateLike = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_model_1 = require("../users/users.model");
const templates_model_1 = require("./templates.model");
let TemplateLike = class TemplateLike extends sequelize_typescript_1.Model {
    userId;
    templateId;
};
exports.TemplateLike = TemplateLike;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' }),
    __metadata("design:type", Number)
], TemplateLike.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => templates_model_1.Template),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Number)
], TemplateLike.prototype, "templateId", void 0);
exports.TemplateLike = TemplateLike = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'template_likes',
        indexes: [
            {
                unique: true,
                fields: ['userId', 'templateId'],
            },
        ],
    })
], TemplateLike);
//# sourceMappingURL=template-likes.model.js.map