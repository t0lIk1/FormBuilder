import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template) private templateRepository: typeof Template,
    @InjectModel(Question) private questionRepository: typeof Question,
    private tagsService: TagsService,
  ) {}

  async create(dto: CreateTemplateDto, tagNames?: string[]) {
    const template = await this.templateRepository.create(dto);

    const tags = await this.tagsService.findOrCreate(tagNames);
    await template.$set('tags', tags);
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

  async update(id: number, dto: CreateTemplateDto, tagNames?: string[]) {
    const template = await this.templateRepository.findByPk(id);
    if (!template) throw new NotFoundException('Template not found');
    const updateTemplate = await template.update(dto);
    const tags = await this.tagsService.findOrCreate(tagNames);
    await updateTemplate.$set('tags', tags);
    return updateTemplate;
  }

  async remove(id: number) {
    const template = await this.templateRepository.findByPk(id);
    if (!template) throw new NotFoundException('Template not found');

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
