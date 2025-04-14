import { Form } from './forms.model';
import { Answer } from './answers.model';
import { Question } from '../questions/questions.model';
import { Templates } from '../templates/templates.model';
import { SubmitFormDto } from './dto/submit-form.dto';
export declare class FormsService {
    private formRepository;
    private answerRepository;
    private questionRepository;
    private templateRepository;
    constructor(formRepository: typeof Form, answerRepository: typeof Answer, questionRepository: typeof Question, templateRepository: typeof Templates);
    submitForm(dto: SubmitFormDto): Promise<Form>;
    getFormResponse(id: number): Promise<Form>;
    getUserResponses(userId: number): Promise<Form[]>;
    getTemplateResponses(templateId: number): Promise<Form[]>;
    private validateAnswer;
    private validateQuestion;
}
