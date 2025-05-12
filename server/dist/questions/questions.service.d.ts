import { Question } from './questions.model';
import { Template } from '../templates/templates.model';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderQuestionsDto } from './dto/reorder-question.dto';
export declare class QuestionsService {
    private questionRepository;
    private templatesRepository;
    constructor(questionRepository: typeof Question, templatesRepository: typeof Template);
    create(templateId: number, dto: CreateQuestionDto): Promise<Question>;
    findAllByTemplate(templateId: number): Promise<Question[]>;
    findOne(templateId: number, id: number): Promise<Question>;
    update(templateId: number, id: number, dto: CreateQuestionDto): Promise<Question>;
    remove(templateId: number, id: number): Promise<void>;
    removeAllByTemplate(templateId: number): Promise<void>;
    reorder(templateId: number, dto: ReorderQuestionsDto): Promise<[affectedCount: number][]>;
    private reorderAfterDelete;
}
