import { Templates } from './templates.model';
import { Question } from '../questions/questions.model';
import { CreateTemplateDto } from './dto/create-template.dto';
export declare class TemplatesService {
    private templateRepository;
    private questionRepository;
    constructor(templateRepository: typeof Templates, questionRepository: typeof Question);
    create(dto: CreateTemplateDto): Promise<Templates>;
    findAll(): Promise<Templates[]>;
    findOne(id: number): Promise<Templates>;
    update(id: number, dto: CreateTemplateDto): Promise<Templates>;
    remove(id: number): Promise<void>;
    getTemplateQuestions(id: number): Promise<Question[]>;
}
