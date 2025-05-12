import { Template } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
import { TagsService } from '../tags/tags.service';
import { TemplateLike } from './template-likes.model';
import { User } from '../users/users.model';
import { QuestionsService } from '../questions/questions.service';
export declare class TemplatesService {
    private templateRepository;
    private questionRepository;
    private userRepository;
    private templateLikeRepository;
    private tagsService;
    private questionsService;
    constructor(templateRepository: typeof Template, questionRepository: typeof Question, userRepository: typeof User, templateLikeRepository: typeof TemplateLike, tagsService: TagsService, questionsService: QuestionsService);
    create(dto: CreateTemplateDto, tagNames?: string[]): Promise<Template | null>;
    findAll(): Promise<Template[]>;
    findAllByUser(userId: number): Promise<Template[]>;
    findOne(id: number): Promise<Template>;
    update(id: number, dto: CreateTemplateDto): Promise<Template | null>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<Question[]>;
    toggleLike(templateId: number, userId: number): Promise<{
        liked: boolean;
    }>;
    searchTemplates(query: string): Promise<Template[]>;
}
