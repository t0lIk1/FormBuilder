import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Templates } from '../templates/templates.model';
import { AuthModule } from '../auth/auth.module';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Question, Templates]),
    AuthModule,
    TemplatesModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
