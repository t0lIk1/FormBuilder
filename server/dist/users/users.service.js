"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const bcrypt = __importStar(require("bcryptjs"));
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(dto) {
        return await this.userRepository.create(dto);
    }
    async updateUser(dto, id) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const updateData = { ...dto };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 4);
        }
        await user.update(updateData);
        return user;
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
    async deleteMe(id) {
        return await this.userRepository.destroy({ where: { id } });
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