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
import { User } from '../users/users.model';
import { Answer } from './answers.model';

@Table({ tableName: 'forms', timestamps: false })
export class Form extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  declare id: number;

  @ForeignKey(() => Template)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  templateId: number;

  @BelongsTo(() => Template, { onDelete: 'CASCADE' })
  template: Template;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
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
