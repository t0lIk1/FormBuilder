import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';
export declare class TemplatesService {
    private templateRepository;
    private questionRepository;
    private tagsService;
    constructor(templateRepository: typeof Template, questionRepository: typeof Question, tagsService: TagsService);
    create(dto: CreateTemplateDto, tagNames?: string[]): Promise<void>;
    findAll(): Promise<Template[]>;
    findOne(id: number): Promise<Template>;
    update(id: number, dto: CreateTemplateDto, tagNames?: string[]): Promise<Template>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<Question[]>;
}
