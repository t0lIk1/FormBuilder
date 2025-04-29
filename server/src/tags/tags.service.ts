import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tags.model';
import { Op } from 'sequelize';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  async findOrCreate(names?: string[]) {
    const tags: Tag[] = [];

    if (!names) return [];

    for (let name of names) {
      name = name.trim().toLowerCase();

      const [tag] = await this.tagRepository.findOrCreate({
        where: { name },
      });

      tags.push(tag);
    }

    return tags;
  }

  async findAll(): Promise<Tag[]> {
    return this.tagRepository.findAll({ order: [['name', 'ASC']] });
  }

  async autocomplete(prefix: string): Promise<Tag[]> {
    return this.tagRepository.findAll({
      where: {
        name: {
          [Op.iLike]: `${prefix}%`,
        },
      },
      limit: 10,
      order: [['name', 'ASC']],
    });
  }
}
