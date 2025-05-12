import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/users.model';
export declare class AuthService {
    private jwtService;
    private usersService;
    constructor(jwtService: JwtService, usersService: UsersService);
    registration(userDto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(userDto: LoginUserDto): Promise<{
        token: string;
    }>;
    generateToken(user: User): {
        token: string;
    };
    private validateUser;
}
