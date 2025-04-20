import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';

@Table({ tableName: 'answer_options' })
export class AnswerOption extends Model<AnswerOption> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questionId: number;

  @BelongsTo(() => Question)
  question: Question;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => Answer)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  answerId: number;

  @BelongsTo(() => Answer)
  answer: Answer;
}