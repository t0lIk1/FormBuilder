import {
  BelongsTo,
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

interface TemplateAttributes {
  title: string;
  description: string;
  topic: string;
  // imageUrl?: string;
  isPublic: boolean;
  userId: number;
}

@Table({ tableName: 'templates' })
export class Templates extends Model<Templates, TemplateAttributes> {
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

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  topic: string;

  // @Column({ type: DataType.STRING })
  // imageUrl: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isPublic: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Question)
  questions: Question[];

  @HasMany(() => Form)
  forms: Form[];
}
