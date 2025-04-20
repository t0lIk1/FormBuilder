import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Template } from '../templates/templates.model';
import { Answer } from '../forms/answers.model';
import { QuestionType } from '../types/enum';

interface QuestionAttributes {
  question: string;
  type: QuestionType;
  isRequired?: boolean;
  options?: string[];
  templateId: number;
  order?: number;
  showInTable?: boolean;
  description?: string;
}

@Table({ tableName: 'questions' })
export class Question extends Model<Question, QuestionAttributes> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 1000],
    },
  })
  question: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.ENUM(...Object.values(QuestionType)),
    allowNull: false,
  })
  type: QuestionType;

  @Column({
    type: DataType.ARRAY(DataType.STRING), // Для PostgreSQL
    defaultValue: [],
    validate: {
      validateOptions(value: string[]) {
        if (
          this.getDataValue('type') === QuestionType.SELECT ||
          this.getDataValue('type') === QuestionType.CHECKBOX
        ) {
          if (!value || value.length === 0) {
            throw new Error(
              'Options are required for SELECT/CHECKBOX type questions',
            );
          }
        }
      },
    },
  })
  options: string[];

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRequired: boolean;



  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  })
  order: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  showInTable: boolean;

  @ForeignKey(() => Template)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  templateId: number;

  @BelongsTo(() => Template)
  template: Template;

  // questions.model.ts
  @HasMany(() => Answer)
  answers: Answer[];
}
