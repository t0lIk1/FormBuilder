import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Template } from '../templates/templates.model';
import { TemplateTag } from './templates-tags.model';

@Table({ tableName: 'tags', timestamps: false })
export class Tag extends Model<Tag> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @BelongsToMany(() => Template, () => TemplateTag)
  templates: Template[];
}
