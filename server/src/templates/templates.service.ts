import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Templates } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Templates) private templateRepository: typeof Templates,
    @InjectModel(Question) private questionRepository: typeof Question,
  ) {}

  async create(dto: CreateTemplateDto) {
    return this.templateRepository.create(dto);
  }

  async findAll() {
    return this.templateRepository.findAll({
      include: [Question],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    const template = await this.templateRepository.findByPk(id, {
      include: [Question],
    });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async update(id: number, dto: CreateTemplateDto) {
    const template = await this.templateRepository.findByPk(id);
    if (!template) throw new NotFoundException('Template not found');
    return template.update(dto);
  }

  async remove(id: number) {
    const template = await this.templateRepository.findByPk(id);
    if (!template) throw new NotFoundException('Template not found');

    // Удаляем связанные вопросы
    await this.questionRepository.destroy({ where: { templateId: id } });
    return template.destroy();
  }

  async getTemplateQuestions(id: number) {
    const template = await this.templateRepository.findByPk(id);
    if (!template) throw new NotFoundException('Template not found');

    return this.questionRepository.findAll({
      where: { templateId: id },
      order: [['order', 'ASC']],
    });
  }
}
