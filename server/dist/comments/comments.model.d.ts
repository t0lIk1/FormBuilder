import { Model } from 'sequelize-typescript';
import { User } from '../users/users.model';
interface CommentsAttributes {
    userId: number;
    templateId: number;
    content: string;
}
export declare class Comment extends Model<Comment, CommentsAttributes> {
    id: number;
    templateId: number;
    content: string;
    userId: number;
    user: User;
}
export {};
