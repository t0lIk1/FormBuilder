import { Model } from 'sequelize-typescript';
import { Templates } from '../templates/templates.model';
export declare enum QuestionType {
    TEXT = "TEXT",
    TEXTAREA = "TEXTAREA",
    NUMBER = "NUMBER",
    CHECKBOX = "CHECKBOX",
    SELECT = "SELECT"
}
interface QuestionAttributes {
    question: string;
    type: QuestionType;
    isRequired?: boolean;
    options?: string[];
    templateId: number;
    order?: number;
    showInTable?: boolean;
    description?: string;
}
export declare class Question extends Model<Question, QuestionAttributes> {
    id: number;
    question: string;
    description: string;
    type: QuestionType;
    isRequired: boolean;
    order: number;
    showInTable: boolean;
    templateId: number;
    template: Templates;
}
export {};
