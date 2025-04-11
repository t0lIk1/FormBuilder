import { QuestionType } from '../../types/enum';
export declare class CreateQuestionDto {
    readonly question: string;
    readonly description?: string;
    readonly type: QuestionType;
    readonly isRequired?: boolean;
    readonly order?: number;
    readonly showInTable?: boolean;
}
