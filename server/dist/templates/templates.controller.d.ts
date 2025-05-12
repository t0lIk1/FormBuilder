import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { Request } from 'express';
import { TagsService } from '../tags/tags.service';
export declare class TemplatesController {
    private readonly templatesService;
    private readonly tagsService;
    constructor(templatesService: TemplatesService, tagsService: TagsService);
    search(query: string): Promise<import("./templates.model").Template[]>;
    autocompleteTags(prefix: string): Promise<import("../tags/tags.model").Tag[]>;
    create(dto: CreateTemplateDto, req: Request): Promise<import("./templates.model").Template | null>;
    findAll(): Promise<import("./templates.model").Template[]>;
    findAllByUser(req: Request): Promise<import("./templates.model").Template[]>;
    findOne(id: number): Promise<import("./templates.model").Template>;
    update(id: number, dto: CreateTemplateDto): Promise<import("./templates.model").Template | null>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<import("../questions/questions.model").Question[]>;
    toggleLike(id: number, req: Request): Promise<{
        liked: boolean;
    }>;
}
