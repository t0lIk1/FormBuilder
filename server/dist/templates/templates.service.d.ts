import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';
import { TemplateLike } from './template-likes.model';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { User } from '../users/users.model';
export declare class TemplatesService {
    private templateRepository;
    private questionRepository;
    private userRepository;
    private templateLikeRepository;
    private tagsService;
    constructor(templateRepository: typeof Template, questionRepository: typeof Question, userRepository: typeof User, templateLikeRepository: typeof TemplateLike, tagsService: TagsService);
    create(dto: CreateTemplateDto, tagNames?: string[]): Promise<Template>;
    findAll(): Promise<Template[]>;
    findOne(id: number): Promise<Template>;
    update(id: number, dto: UpdateTemplateDto, tagNames?: string[]): Promise<Template>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<Question[]>;
    toggleLike(templateId: number, userId: number): Promise<{
        liked: boolean;
    }>;
    searchTemplates(query: string): Promise<Template[]>;
}
