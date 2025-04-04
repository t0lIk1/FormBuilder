import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    create(dto: CreateTemplateDto, req: any): Promise<import("./templates.model").Templates>;
    findAll(): Promise<import("./templates.model").Templates[]>;
    findOne(id: number): Promise<import("./templates.model").Templates>;
    update(id: number, dto: CreateTemplateDto): Promise<import("./templates.model").Templates>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<import("../questions/questions.model").Question[]>;
}
