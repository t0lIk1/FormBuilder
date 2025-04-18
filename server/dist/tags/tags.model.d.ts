import { Model } from 'sequelize-typescript';
import { Template } from '../templates/templates.model';
export declare class Tag extends Model<Tag> {
    id: number;
    name: string;
    templates: Template[];
}
