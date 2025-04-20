import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';
import { TemplateLike } from './template-likes.model';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Tag } from '../tags/tags.model';
import { TemplateTag } from '../tags/templates-tags.model';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template) private templateRepository: typeof Template,
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(TemplateLike)
    private templateLikeRepository: typeof TemplateLike,
    private tagsService: TagsService,
  ) {}

  async create(dto: CreateTemplateDto, tagNames?: string[]) {
    const template = await this.templateRepository.create(dto);

    const tags = await this.tagsService.findOrCreate(tagNames);
    await template.$set('tags', tags);
  }

  async findAll() {
    return await this.templateRepository.findAll({
      include: [
        Question,
        {
          model: Tag,
          through: { attributes: [] },
        },
        {
          model: TemplateLike,
          required: false,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number) {
    const template = await this.templateRepository.findByPk(id, {
      include: { all: true },
    });
    if (!template) throw new NotFoundException('Template not found');
    return template;
  }

  async update(id: number, dto: UpdateTemplateDto, tagNames?: string[]) {
    const template = await this.templateRepository.findByPk(id);
    if (!template) throw new NotFoundException('Template not found');
    const updateTemplate = await template.update(dto);

    if (tagNames) {
      const tags = await this.tagsService.findOrCreate(tagNames);
      await updateTemplate.$set('tags', tags);
    } else {
      await updateTemplate.$set('tags', []);
    }
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

  async toggleLike(templateId: number, userId: number) {
    const existingLike = await this.templateLikeRepository.findOne({
      where: { templateId, userId },
    });

    if (existingLike) {
      await existingLike.destroy();
      return { liked: false };
    } else {
      await this.templateLikeRepository.create({ templateId, userId });
      return { liked: true };
    }
  }
}
