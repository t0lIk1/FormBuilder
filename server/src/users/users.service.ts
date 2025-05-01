import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    return await this.userRepository.create(dto);
  }

  async updateUser(dto: CreateUserDto, id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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

  async findOneUser(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async findByToken(userId: number) {
    return await this.userRepository.findByPk(userId, {
      include: { all: true },
    });
  }

  async deleteMe(id: number) {
    return await this.userRepository.destroy({ where: {id} });
  }

  async deleteUsers(ids: number[]) {
    const deletedCount = await this.userRepository.destroy({
      where: { id: ids },
    });

    if (deletedCount === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
  }

  async blockUsers(ids: number[]) {
    console.log(ids);
    await this.setBlockStatus(ids, true);
  }

  async unBlockUsers(ids: number[]) {
    await this.setBlockStatus(ids, false);
  }

  async toggleUsersRole(ids: number[]) {
    const users = await this.userRepository.findAll({
      where: { id: ids },
    });

    if (users.length !== ids.length) {
      throw new HttpException(`Users not found`, HttpStatus.NOT_FOUND);
    }

    const updatePromises = users.map(async (user) => {
      const newRole = user.dataValues.role === 'USER' ? 'ADMIN' : 'USER';
      await user.update({ role: newRole });
      return { id: user.id, newRole };
    });

    return await Promise.all(updatePromises);
  }

  private async setBlockStatus(ids: number[], isBlocked: boolean) {
    const users = await this.userRepository.findAll({
      where: { id: ids },
    });

    if (users.length !== ids.length) {
      throw new HttpException(
        'Some users were not found',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userRepository.update({ isBlocked }, { where: { id: ids } });
  }
}
