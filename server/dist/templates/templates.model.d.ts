import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Question } from '../questions/questions.model';
import { Form } from '../forms/forms.model';
interface TemplateAttributes {
    title: string;
    description: string;
    topic: string;
    isPublic: boolean;
    userId: number;
}
export declare class Templates extends Model<Templates, TemplateAttributes> {
    id: number;
    title: string;
    description: string;
    topic: string;
    isPublic: boolean;
    userId: number;
    user: User;
    questions: Question[];
    forms: Form[];
}
export {};
