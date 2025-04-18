import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Template } from '../templates/templates.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderQuestionsDto } from './dto/reorder-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(Template) private templatesRepository: typeof Template,
  ) {}

  async create(templateId: number, dto: CreateQuestionDto) {
    const template = await this.templatesRepository.findByPk(templateId);
    if (!template) throw new NotFoundException('Template not found');

    const maxOrder = await this.questionRepository.max('order', {
      where: { templateId },
    });
    const newOrder = typeof maxOrder === 'number' ? maxOrder + 1 : 0;

    return this.questionRepository.create({
      ...dto,
      templateId,
      order: newOrder,
    });
  }

  async findAllByTemplate(templateId: number) {
    return this.questionRepository.findAll({
      where: { templateId },
      order: [['order', 'ASC']],
    });
  }

  async findOne(templateId: number, id: number) {
    const question = await this.questionRepository.findOne({
      where: { id, templateId },
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }

  async update(templateId: number, id: number, dto: CreateQuestionDto) {
    const question = await this.findOne(templateId, id);
    if (!question) {
      throw new NotFoundException('Question not founded');
    }
    return question.update(dto);
  }

  async remove(templateId: number, id: number) {
    const question = await this.findOne(templateId, id);
    await question.destroy();

    await this.reorderAfterDelete(templateId);
  }

  async reorder(templateId: number, dto: ReorderQuestionsDto) {
    const updates = dto.orderedIds.map((id, index) =>
      this.questionRepository.update(
        { order: index },
        { where: { id, templateId } },
      ),
    );
    return Promise.all(updates);
  }

  private async reorderAfterDelete(templateId: number) {
    const questions = await this.questionRepository.findAll({
      where: { templateId },
      order: [['order', 'ASC']],
    });

    const updates = questions.map((q, index) =>
      this.questionRepository.update({ order: index }, { where: { id: q.id } }),
    );

    await Promise.all(updates);
  }
}
