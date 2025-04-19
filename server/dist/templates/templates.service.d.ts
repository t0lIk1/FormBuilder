import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';
import { TemplateLike } from './template-likes.model';
import { UpdateTemplateDto } from './dto/update-template.dto';
export declare class TemplatesService {
    private templateRepository;
    private questionRepository;
    private templateLikeRepository;
    private tagsService;
    constructor(templateRepository: typeof Template, questionRepository: typeof Question, templateLikeRepository: typeof TemplateLike, tagsService: TagsService);
    create(dto: CreateTemplateDto, tagNames?: string[]): Promise<void>;
    findAll(): Promise<Template[]>;
    findOne(id: number): Promise<Template>;
    update(id: number, dto: UpdateTemplateDto, tagNames?: string[]): Promise<Template>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<Question[]>;
    toggleLike(templateId: number, userId: number): Promise<{
        liked: boolean;
    }>;
}
