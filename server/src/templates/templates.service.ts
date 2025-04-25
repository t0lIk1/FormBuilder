import { InjectModel } from '@nestjs/sequelize';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';
import { TemplateLike } from './template-likes.model';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Tag } from '../tags/tags.model';
import * as Fuse from 'fuse.js';
import { User } from '../users/users.model';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template) private templateRepository: typeof Template,
    @InjectModel(Question) private questionRepository: typeof Question,
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(TemplateLike)
    private templateLikeRepository: typeof TemplateLike,
    private tagsService: TagsService,
    private questionsService: QuestionsService,
  ) {}

  async create(dto: CreateTemplateDto, tagNames?: string[]) {
    const author = await this.userRepository.findByPk(dto.authorId);
    if (!author) {
      throw new NotFoundException('User not found');
    }

    const template = await this.templateRepository.create({
      ...dto,
      authorName: author.dataValues.name,
    });

    const tags = await this.tagsService.findOrCreate(tagNames);
    await template.$set('tags', tags);

    if (dto.questions?.length) {
      for (const questionDto of dto.questions) {
        await this.questionsService.create(template.id, questionDto);
      }
    }

    return this.templateRepository.findByPk(template.id, {
      include: [Tag, Question],
    });
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

  async findAllByUser(userId: number) {
    return await this.templateRepository.findAll({
      where: { authorId: userId },
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

  async searchTemplates(query: string) {
    if (!query || query.trim() === '') {
      return this.findAll();
    }
    console.log(query, 'query');

    const templates = await this.templateRepository.findAll({
      include: [
        Question,
        { model: Tag },
        { model: TemplateLike, required: false },
      ],
    });
    console.log(templates);
    // Оптимизированные настройки Fuse.js
    const options = {
      keys: [
        { name: 'dataValues.title', weight: 0.6 }, // Наибольший вес для title
        { name: 'dataValues.description', weight: 0.2 },
        { name: 'dataValues.topic', weight: 0.1 },
        { name: 'dataValues.tags[0].name', weight: 0.4 },
      ],
      includeScore: true,
      threshold: 0.5, // Более строгий порог
      minMatchCharLength: 3, // Минимум 3 символа для совпадения
      ignoreLocation: true, // Искать совпадения в любом месте строки
      shouldSort: true, // Обязательная сортировка
      findAllMatches: false, // Только лучшие совпадения
      ignoreCase: true,
    };

    console.log(options);

    const fuse = new Fuse.default(templates, options);
    const results = fuse.search(query);
    console.log(results);
    // Сортировка по релевантности (score)
    const sortedResults = results
      .sort((a, b) => (a.score || 1) - (b.score || 1))
      .map((result) => result.item);

    return sortedResults;
  }
}
