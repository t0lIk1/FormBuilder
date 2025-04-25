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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const users_model_1 = require("./users.model");
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(dto) {
        return await this.userRepository.create(dto);
    }
    async findAllUsers() {
        return await this.userRepository.findAll();
    }
    async findOneUser(email) {
        return await this.userRepository.findOne({
            where: { email },
            include: { all: true },
        });
    }
    async findByToken(userId) {
        return await this.userRepository.findByPk(userId, {
            include: { all: true },
        });
    }
    async deleteUsers(ids) {
        const deletedCount = await this.userRepository.destroy({
            where: { id: ids },
        });
        if (deletedCount === 0) {
            throw new common_1.HttpException('No users found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    async blockUsers(ids) {
        console.log(ids);
        await this.setBlockStatus(ids, true);
    }
    async unBlockUsers(ids) {
        await this.setBlockStatus(ids, false);
    }
    async toggleUsersRole(ids) {
        const users = await this.userRepository.findAll({
            where: { id: ids },
        });
        if (users.length !== ids.length) {
            throw new common_1.HttpException(`Users not found`, common_1.HttpStatus.NOT_FOUND);
        }
        const updatePromises = users.map(async (user) => {
            const newRole = user.dataValues.role === 'USER' ? 'ADMIN' : 'USER';
            await user.update({ role: newRole });
            return { id: user.id, newRole };
        });
        return await Promise.all(updatePromises);
    }
    async setBlockStatus(ids, isBlocked) {
        const users = await this.userRepository.findAll({
            where: { id: ids },
        });
        if (users.length !== ids.length) {
            throw new common_1.HttpException('Some users were not found', common_1.HttpStatus.NOT_FOUND);
        }
        await this.userRepository.update({ isBlocked }, { where: { id: ids } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(users_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map