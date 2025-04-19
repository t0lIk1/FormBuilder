import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TemplatesModule } from './templates/templates.module';
import { QuestionsModule } from './questions/questions.module';
import { FormsModule } from './forms/forms.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    TemplatesModule,
    QuestionsModule,
    FormsModule,
    CommentsModule,
    TagsModule,
  ],
})
export class AppModule {}
