import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { Form } from './forms.model';
import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import { Templates } from '../templates/templates.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Form, Answer, Question, Templates]),
    AuthModule,
  ],
  controllers: [FormsController],
  providers: [FormsService],
  exports: [FormsService],
})
export class FormsModule {}
