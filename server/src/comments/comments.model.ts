import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

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

  @Column({ type: DataType.INTEGER, allowNull: false })
  templateId: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
