import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.model';

@Module({
  imports: [SequelizeModule.forFeature([Comment, User]), AuthModule],
  providers: [CommentsService, CommentsGateway],
})
export class CommentsModule {}
