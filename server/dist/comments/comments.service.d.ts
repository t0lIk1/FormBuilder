import { Comment } from './comments.model';
export declare class CommentsService {
    private commentRepository;
    constructor(commentRepository: typeof Comment);
    create(userId: number, templateId: number, content: string): Promise<Comment>;
    getAllComments(templateId: number): Promise<Comment[]>;
}
