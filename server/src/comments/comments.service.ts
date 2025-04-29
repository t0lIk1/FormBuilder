// src/comments/comments.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from '../users/users.model';
import { Template } from '../templates/templates.model'; // Обязательно импортируем модель

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Template) private templateRepository: typeof Template,
  ) {}

  async create(userId: number, templateId: number, content: string) {
    const comment = await this.commentRepository.create({
      userId,
      templateId,
      content,
    });
    return this.commentRepository.findByPk(comment.id, {
      include: [{ model: User, attributes: ['id', 'name', 'avatar'] }],
    });
  }

  async getAllComments(templateId: number) {
    return await this.commentRepository.findAll({
      where: { templateId },
      include: { model: User, attributes: ['id', 'name'] },
      order: [['createdAt', 'ASC']],
    });
  }

  async getCommentById(commentId: number) {
    return await this.commentRepository.findByPk(commentId);
  }

  async deleteComment(commentId: number, userId: number) {
    return await this.commentRepository.destroy({
      where: {
        id: commentId,
        userId: userId,
      },
    });
  }

  async updateComment(commentId: number, userId: number, content: string) {
    const [updated] = await this.commentRepository.update(
      { content },
      { where: { id: commentId, userId } },
    );

    return updated > 0;
  }
}
