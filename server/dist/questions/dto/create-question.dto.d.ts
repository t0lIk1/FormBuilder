import { QuestionType } from '../questions.model';
export declare class CreateQuestionDto {
    readonly question: string;
    readonly description?: string;
    readonly type: QuestionType;
    readonly isRequired?: boolean;
    readonly options?: string[];
}
