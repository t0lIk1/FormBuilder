import { Question } from 'src/questions/questions.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Form } from './forms.model';

@Table({ tableName: 'answers' })
export class Answer extends Model<Answer> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Form)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  formId: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  questionId: number;

  @BelongsTo(() => Form, { onDelete: 'CASCADE' })
  form: Form;

  @BelongsTo(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  value: string | null;
}
