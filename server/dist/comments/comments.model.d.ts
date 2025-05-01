import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Template } from '../templates/templates.model';
interface CommentsAttributes {
    userId: number;
    templateId: number;
    content: string;
}
export declare class Comment extends Model<Comment, CommentsAttributes> {
    id: number;
    templateId: number;
    userId: number;
    user: User;
    template: Template;
    content: string;
}
export {};
