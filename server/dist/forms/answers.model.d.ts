import { Model } from 'sequelize-typescript';
import { Question } from '../questions/questions.model';
import { Form } from './forms.model';
export declare class Answer extends Model {
    id: number;
    formResponseId: number;
    formResponse: Form;
    questionId: number;
    question: Question;
    value: string;
}
