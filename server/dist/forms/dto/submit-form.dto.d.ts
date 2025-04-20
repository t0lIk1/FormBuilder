export declare class AnswerDto {
    questionId: number;
    value: string | string[];
}
export declare class SubmitFormDto {
    userId: number;
    answers: AnswerDto[];
}
