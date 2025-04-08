import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { Templates } from './templates.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Question } from '../questions/questions.model';
import { User } from '../users/users.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Question, Templates, User]),
    AuthModule,
  ],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports: [TemplatesService],
})
export class TemplatesModule {}
