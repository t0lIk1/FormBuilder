import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Template } from './templates.model';

@Table({
  tableName: 'template_likes',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'templateId'],
    },
  ],
})
export class TemplateLike extends Model {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  userId: number;

  @ForeignKey(() => Template)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  templateId: number;
}
