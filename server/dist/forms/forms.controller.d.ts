import { FormsService } from './forms.service';
import { SubmitFormDto } from './dto/submit-form.dto';
import { Request } from 'express';
export declare class FormsController {
    private readonly formsService;
    constructor(formsService: FormsService);
    submitForm(dto: SubmitFormDto, req: Request, templateId: number): Promise<import("./forms.model").Form>;
    getFormResponse(id: string): Promise<import("./forms.model").Form>;
    getUserResponses(req: Request): Promise<import("./forms.model").Form[]>;
    getTemplateResponses(templateId: string): Promise<import("./forms.model").Form[]>;
}
