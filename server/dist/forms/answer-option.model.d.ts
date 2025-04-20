import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import { Model } from 'sequelize-typescript';
export declare class AnswerOption extends Model<AnswerOption> {
    id: number;
    questionId: number;
    question: Question;
    text: string;
    answerId: number;
    answer: Answer;
}
