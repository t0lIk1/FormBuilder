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
exports.Form = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const templates_model_1 = require("../templates/templates.model");
const users_model_1 = require("../users/users.model");
const answers_model_1 = require("./answers.model");
let Form = class Form extends sequelize_typescript_1.Model {
    templateId;
    template;
    userId;
    user;
    submittedAt;
    answers;
};
exports.Form = Form;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    }),
    __metadata("design:type", Number)
], Form.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => templates_model_1.Template),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Form.prototype, "templateId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => templates_model_1.Template),
    __metadata("design:type", templates_model_1.Template)
], Form.prototype, "template", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Form.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Form.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATE,
        allowNull: false,
        defaultValue: sequelize_typescript_1.DataType.NOW,
    }),
    __metadata("design:type", Date)
], Form.prototype, "submittedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => answers_model_1.Answer),
    __metadata("design:type", Array)
], Form.prototype, "answers", void 0);
exports.Form = Form = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: 'forms', timestamps: false })
], Form);
//# sourceMappingURL=forms.model.js.map