import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<import("./users.model").User>;
    getAll(): Promise<import("./users.model").User[]>;
    getOne(email: string): Promise<import("./users.model").User | null>;
    delete(body: {
        ids: number[];
    }): Promise<void>;
    block(body: {
        ids: number[];
    }): Promise<void>;
    unblock(body: {
        ids: number[];
    }): Promise<void>;
}
