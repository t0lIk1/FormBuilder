import { QuestionType } from '../../types/enum';
export declare class CreateQuestionDto {
    id?: number;
    question: string;
    description?: string;
    type: QuestionType;
    options?: string[];
    isRequired?: boolean;
    order?: number;
    showInTable?: boolean;
}
