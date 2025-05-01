import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { Template } from './templates.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from '../questions/questions.model';
import { User } from '../users/users.model';
import { AuthModule } from '../auth/auth.module';
import { Tag } from '../tags/tags.model';
import { TemplateTag } from '../tags/templates-tags.model';
import { TagsModule } from '../tags/tags.module';
import { TemplateLike } from './template-likes.model';
import { QuestionsModule } from '../questions/questions.module';
import { Comment } from '../comments/comments.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Question,
      Template,
      User,
      Tag,
      Comment,
      TemplateTag,
      TemplateLike,
    ]),
    AuthModule,
    TagsModule,
    QuestionsModule,
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
