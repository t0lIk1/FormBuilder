import { Question } from 'src/questions/questions.model';
import { AnswerOption } from './answer-option.model';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
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
  })
  declare formId: number;

  @ForeignKey(() => Question)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare questionId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare value: string | null;

  // Добавляем явное объявление для ассоциаций
  @BelongsTo(() => Form)
  declare form: Form;

  @BelongsTo(() => Question)
  declare question: Question;

  @HasMany(() => AnswerOption)
  declare selectedOptions: AnswerOption[];
}
