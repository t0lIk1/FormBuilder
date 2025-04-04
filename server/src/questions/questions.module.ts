import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from './questions.model';
import { Templates } from '../templates/templates.model';

@Module({
  imports: [SequelizeModule.forFeature([Question, Templates])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
