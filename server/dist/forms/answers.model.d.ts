import { Question } from 'src/questions/questions.model';
import { Model } from 'sequelize-typescript';
import { Form } from './forms.model';
export declare class Answer extends Model<Answer> {
    id: number;
    formId: number;
    questionId: number;
    form: Form;
    question: Question;
    value: string | null;
}
