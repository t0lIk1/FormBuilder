import { Model } from 'sequelize-typescript';
import { Templates } from '../templates/templates.model';
import { User } from '../users/users.model';
import { Answer } from './answers.model';
export declare class Form extends Model {
    id: number;
    templateId: number;
    template: Templates;
    userId: number;
    user: User;
    submittedAt: Date;
    answers: Answer[];
}
