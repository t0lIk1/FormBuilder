import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderQuestionsDto } from './dto/reorder-question.dto';
export declare class QuestionsController {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    create(templateId: number, dto: CreateQuestionDto): Promise<import("./questions.model").Question>;
    findAll(templateId: number): Promise<import("./questions.model").Question[]>;
    findOne(templateId: number, id: number): Promise<import("./questions.model").Question>;
    update(templateId: number, id: number, dto: CreateQuestionDto): Promise<import("./questions.model").Question>;
    remove(templateId: number, id: number): Promise<void>;
    reorder(templateId: number, reorderDto: ReorderQuestionsDto): Promise<import("./questions.model").Question[]>;
}
