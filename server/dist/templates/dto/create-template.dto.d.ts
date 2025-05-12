import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
export declare class CreateTemplateDto {
    title: string;
    description: string;
    topic: string;
    isPublic: boolean;
    authorId: number;
    tags?: string[];
    questions?: CreateQuestionDto[];
}
