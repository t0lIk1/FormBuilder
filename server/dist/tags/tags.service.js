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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const tags_model_1 = require("./tags.model");
const sequelize_2 = require("sequelize");
let TagsService = class TagsService {
    tagRepository;
    constructor(tagRepository) {
        this.tagRepository = tagRepository;
    }
    async findOrCreate(names) {
        const tags = [];
        if (!names)
            return [];
        for (let name of names) {
            name = name.trim().toLowerCase();
            const [tag] = await this.tagRepository.findOrCreate({
                where: { name },
            });
            tags.push(tag);
        }
        return tags;
    }
    async findAll() {
        return this.tagRepository.findAll({ order: [['name', 'ASC']] });
    }
    async autocomplete(prefix) {
        return this.tagRepository.findAll({
            where: {
                name: {
                    [sequelize_2.Op.iLike]: `${prefix}%`,
                },
            },
            limit: 10,
            order: [['name', 'ASC']],
        });
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(tags_model_1.Tag)),
    __metadata("design:paramtypes", [Object])
], TagsService);
//# sourceMappingURL=tags.service.js.map