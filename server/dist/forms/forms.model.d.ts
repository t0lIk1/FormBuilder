import { Model } from 'sequelize-typescript';
import { Template } from '../templates/templates.model';
import { User } from '../users/users.model';
import { Answer } from './answers.model';
export declare class Form extends Model {
    id: number;
    templateId: number;
    template: Template;
    userId: number;
    user: User;
    submittedAt: Date;
    answers: Answer[];
}
