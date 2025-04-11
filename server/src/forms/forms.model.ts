import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Templates } from '../templates/templates.model';
import { User } from '../users/users.model';
import { Answer } from './answers.model';

@Table({ tableName: 'forms' })
export class Form extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  declare id: number;

  @ForeignKey(() => Templates)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  templateId: number;

  @BelongsTo(() => Templates)
  template: Templates;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  submittedAt: Date;

  @HasMany(() => Answer)
  answers: Answer[];
}
