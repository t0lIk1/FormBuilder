import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Question } from '../questions/questions.model';
import { Form } from '../forms/forms.model';
import { Tag } from '../tags/tags.model';
import { TemplateLike } from './template-likes.model';
interface TemplateAttributes {
    title: string;
    description: string;
    topic: string;
    isPublic: boolean;
    authorId: number;
    authorName: string;
}
export declare class Template extends Model<Template, TemplateAttributes> {
    id: number;
    title: string;
    description: string;
    topic: string;
    isPublic: boolean;
    authorId: number;
    authorName: string;
    user: User;
    questions: Question[];
    forms: Form[];
    tags: Tag[];
    likes: TemplateLike[];
}
export {};
