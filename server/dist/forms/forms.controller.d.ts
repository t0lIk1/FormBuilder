import { FormsService } from './forms.service';
interface SubmitFormDto {
    answers: {
        questionId: number;
        value: string;
    }[];
}
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    submitForm(dto: SubmitFormDto, req: any, templateId: number): Promise<import("./forms.model").Form>;
    getFormResponse(id: string): Promise<import("./forms.model").Form>;
    getUserResponses(req: any): Promise<import("./forms.model").Form[]>;
    getTemplateResponses(templateId: string): Promise<import("./forms.model").Form[]>;
}
export {};
