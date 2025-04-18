import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tags.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Template } from '../templates/templates.model';
import { TemplateTag } from './templates-tags.model';

@Module({
  imports: [SequelizeModule.forFeature([Tag, Template, TemplateTag])],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
