import { Comment } from './comments.model';
import { User } from '../users/users.model';
import { Template } from '../templates/templates.model';
export declare class CommentsService {
    private commentRepository;
    private userRepository;
    private templateRepository;
    constructor(commentRepository: typeof Comment, userRepository: typeof User, templateRepository: typeof Template);
    create(userId: number, templateId: number, content: string): Promise<Comment | null>;
    getAllComments(templateId: number): Promise<Comment[]>;
    getCommentById(commentId: number): Promise<Comment | null>;
    deleteComment(commentId: number, userId: number): Promise<number>;
    updateComment(commentId: number, userId: number, content: string): Promise<boolean>;
}
