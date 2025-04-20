import { Model } from 'sequelize-typescript';
import { Template } from '../templates/templates.model';
import { Answer } from '../forms/answers.model';
import { QuestionType } from '../types/enum';
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
    options: string[];
    isRequired: boolean;
    order: number;
    showInTable: boolean;
    templateId: number;
    template: Template;
    answers: Answer[];
}
export {};
