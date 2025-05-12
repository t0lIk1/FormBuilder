import { Model } from 'sequelize-typescript';
import { Form } from '../forms/forms.model';
import { Template } from '../templates/templates.model';
import { Comment } from '../comments/comments.model';
interface UserAttributes {
    name: string;
    email: string;
    password: string;
    isBlocked?: boolean;
    role?: string;
}
export declare class User extends Model<User, UserAttributes> {
    id: number;
    name: string;
    email: string;
    password: string;
    isBlocked: boolean;
    role: 'ADMIN' | 'USER';
    answers: Form[];
    templates: Template[];
    comments: Comment[];
}
export {};
