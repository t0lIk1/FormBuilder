import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(dto: CreateUserDto): Promise<User>;
    findAllUsers(): Promise<User[]>;
    findOneUser(email: string): Promise<User | null>;
    findByToken(userId: number): Promise<User | null>;
    deleteUsers(ids: number[]): Promise<void>;
    blockUsers(ids: number[]): Promise<void>;
    unBlockUsers(ids: number[]): Promise<void>;
    toggleUsersRole(ids: number[]): Promise<{
        id: number;
        newRole: string;
    }[]>;
    private setBlockStatus;
}
