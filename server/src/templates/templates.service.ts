import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Templates } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Templates) private templateRepository: typeof Templates,
    @InjectModel(Question) private questionRepository: typeof Question,
    // private usersService: UsersService,
  ) {}

  async create(dto: CreateTemplateDto) {
    return await this.templateRepository.create(dto);
  }

  async findAll() {
    return await this.templateRepository.findAll({
      include: [Question],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    const template = await this.templateRepository.findByPk(id, {
      include: [Question],
    });
    if (!template) {
      throw new NotFoundException();
    }
    return template;
  }

  async update(id: number, dto: CreateTemplateDto) {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException();
    }
    return template.update(dto);
  }

  async remove(id: number) {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException();
    }
    return template.destroy();
  }

  async getTemplateQuestions(id: number) {
    const template = await this.templateRepository.findOne({ where: { id } });

    if (!template) {
      throw new NotFoundException();
    }

    return template.questions.sort((a, b) => a.order - b.order);
  }
}
