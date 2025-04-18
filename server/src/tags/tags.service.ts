import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tag } from './tags.model';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag) private tagRepository: typeof Tag) {}

  async findOrCreate(names?: string[]) {
    const tags: Tag[] = [];

    if (!names) {
      return [];
    }

    for (const name of names) {
      const [tag] = await this.tagRepository.findOrCreate({
        where: { name: name.trim().toLowerCase() },
      });

      tags.push(tag);
    }

    return tags;
  }
}
