import {
  Table,
  Column,
  ForeignKey,
  Model,
  DataType,
} from 'sequelize-typescript';
import { Tag } from './tags.model';
import { Template } from '../templates/templates.model';

@Table({ tableName: 'template_tags', timestamps: false })
export class TemplateTag extends Model<TemplateTag> {
  @ForeignKey(() => Template)
  @Column({ type: DataType.INTEGER })
  templateId: number;

  @ForeignKey(() => Tag)
  @Column({ type: DataType.INTEGER })
  tagId: number;
}
