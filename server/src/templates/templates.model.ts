import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Question } from '../questions/questions.model';
import { Form } from '../forms/forms.model';
import { Tag } from '../tags/tags.model';
import { TemplateTag } from '../tags/templates-tags.model';
import { TemplateLike } from './template-likes.model';

interface TemplateAttributes {
  title: string;
  description: string;
  topic: string;
  // imageUrl?: string;
  isPublic: boolean;
  authorId: number;
  authorName: string;
}

@Table({ tableName: 'templates' })
export class Template extends Model<Template, TemplateAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  topic: string;

  // @Column({ type: DataType.STRING })
  // imageUrl: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isPublic: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.STRING, allowNull: false })
  authorName: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Form)
  forms: Form[];

  @BelongsToMany(() => Tag, () => TemplateTag)
  tags: Tag[];

  @HasMany(() => TemplateLike)
  likes: TemplateLike[];
}
