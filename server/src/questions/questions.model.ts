import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Templates } from '../templates/templates.model';

export enum QuestionType {
  TEXT = 'TEXT', // Однострочный текст
  TEXTAREA = 'TEXTAREA', // Многострочный текст
  NUMBER = 'NUMBER', // Число
  CHECKBOX = 'CHECKBOX', // Чекбокс
  SELECT = 'SELECT', // Выпадающий список
}

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
    type: DataType.STRING(500),
  })
  description: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(QuestionType),
    allowNull: false,
    validate: {
      isIn: [Object.values(QuestionType)],
    },
  })
  type: QuestionType;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isRequired: boolean;

  @Column({
    type: DataType.JSON,
    defaultValue: [],
    validate: {
      validateOptions(value: string[]) {
        if (!value || value.length === 0) {
          throw new Error('Options are required for SELECT type questions');
        }
      },
    },
  })
  options: string[];

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

  @ForeignKey(() => Templates)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  templateId: number;

  @BelongsTo(() => Templates)
  template: Templates;
}
