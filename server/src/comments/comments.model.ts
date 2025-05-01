import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Template } from '../templates/templates.model';

interface CommentsAttributes {
  userId: number;
  templateId: number;
  content: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentsAttributes> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Template)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  templateId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @BelongsTo(() => Template, { onDelete: 'CASCADE' })
  template: Template;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;
}
