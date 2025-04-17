// src/comments/comments.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from '../users/users.model';
import { Templates } from '../templates/templates.model'; // Обязательно импортируем модель

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Templates) private templateRepository: typeof Templates,
  ) {}

  async create(userId: number, templateId: number, content: string) {
    const template = await this.templateRepository.findByPk(templateId);
    if (!template) {
      throw new NotFoundException('Template not found');
    }
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.commentRepository.create({ userId, templateId, content });
  }

  async getAllComments(templateId: number) {
    return await this.commentRepository.findAll({
      where: { templateId },
      include: { model: User, attributes: ['id', 'name'] },
      order: [['createdAt', 'ASC']],
    });
  }

  // src/comments/comments.service.ts
  async getCommentById(commentId: number) {
    return await this.commentRepository.findByPk(commentId);
  }

  async deleteComment(commentId: number, userId: number) {
    // Удаляем только если комментарий принадлежит пользователю
    return await this.commentRepository.destroy({
      where: {
        id: commentId,
        userId: userId, // Проверка что комментарий принадлежит пользователю
      },
    });
  }
}
