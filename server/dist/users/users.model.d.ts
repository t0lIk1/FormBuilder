import { Model } from 'sequelize-typescript';
import { Form } from "../forms/forms.model";
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
    role: string;
    answers: Form[];
}
export {};
