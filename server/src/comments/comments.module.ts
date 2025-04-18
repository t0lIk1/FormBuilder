import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';
import { Template } from '../templates/templates.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment, User, Template]), AuthModule],
  providers: [CommentsService, CommentsGateway],
})
export class CommentsModule {}
