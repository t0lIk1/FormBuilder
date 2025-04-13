export declare class SubmitFormDto {
    templateId?: number;
    userId?: number;
    answers: [
        {
            questionId: number;
            value: string;
        }
    ];
}
