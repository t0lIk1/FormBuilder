import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Question } from '../questions/questions.model';
import { Form } from './forms.model';
import { QuestionType } from '../types/enum';

@Table({ tableName: 'answers', timestamps: false })
export class Answer extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  declare id: number;

  @ForeignKey(() => Form)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  formId: number;

  @BelongsTo(() => Form)
  formResponse: Form;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  value: string;
}
