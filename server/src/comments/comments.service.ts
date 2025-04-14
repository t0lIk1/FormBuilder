// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from '../users/users.model'; // Обязательно импортируем модель

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
  ) {}

  async create(userId: number, templateId: number, content: string) {
    return await this.commentRepository.create({ userId, templateId, content });
  }

  async getAllComments(templateId: number) {
    return this.commentRepository.findAll({
      where: { templateId },
      include: { model: User, attributes: ['id', 'name'] },
      order: [['createdAt', 'ASC']],
    });
  }
}
