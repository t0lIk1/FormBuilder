import { Question } from 'src/questions/questions.model';
import { AnswerOption } from './answer-option.model';
import { Model } from 'sequelize-typescript';
import { Form } from './forms.model';
export declare class Answer extends Model<Answer> {
    id: number;
    formId: number;
    questionId: number;
    value: string | null;
    form: Form;
    question: Question;
    selectedOptions: AnswerOption[];
}
