import { Tag } from './tags.model';
export declare class TagsService {
    private tagRepository;
    constructor(tagRepository: typeof Tag);
    findOrCreate(names?: string[]): Promise<Tag[]>;
}
