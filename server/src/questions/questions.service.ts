import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderQuestionsDto } from './dto/reorder-question.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Templates } from '../templates/templates.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(Templates) private templatesRepository: typeof Templates,
  ) {}

  async create(templateId: number, dto: CreateQuestionDto) {
    const template = await this.templatesRepository.findByPk(templateId);
    if (!template) {
      throw new NotFoundException();
    }
    return this.questionRepository.create({
      ...dto,
      templateId,
      order: await this.getNextOrder(templateId),
    });
  }

  async findAllByTemplate(templateId: number) {
    return await this.questionRepository.findAll({
      where: { templateId },
      order: [['order', 'DESC']],
    });
  }

  async findOne(templateId: number, id: number) {
    const question = await this.questionRepository.findOne({
      where: { id, templateId },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async update(templateId: number, id: number, dto: CreateQuestionDto) {
    const question = await this.questionRepository.findOne({
      where: { id, templateId },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question.update(dto);
  }

  async remove(templateId: number, id: number) {
    const question = await this.questionRepository.findOne({
      where: { id, templateId },
    });

    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question.destroy();
  }

  async reorder(templateId: number, dto: ReorderQuestionsDto) {
    const questions = await this.findAllByTemplate(templateId);
    const updates = questions.map((q) => {
      const newOrder = dto.orderedIds.indexOf(q.id);
      return q.update({ order: newOrder });
    });
    return Promise.all(updates);
  }

  private async getNextOrder(templateId: number) {
    const lastQuestion = await this.questionRepository.findOne({
      where: { templateId },
      order: [['order', 'DESC']],
    });
    return lastQuestion ? lastQuestion.order + 1 : 0;
  }
}
