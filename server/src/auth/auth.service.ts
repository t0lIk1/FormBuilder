// auth.service.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { User } from '../users/users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.findOneUser(userDto.email);
    if (candidate) {
      console.log(candidate);
      throw new HttpException('have', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 4);
    const user = await this.usersService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  generateToken(user: User) {
    const payload = {
      name: user.dataValues.name,
      email: user.dataValues.email,
      id: user.id,
      role: user.dataValues.role,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.findOneUser(userDto.email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!userDto.password || !user.dataValues.password) {
      console.error('Invalid credentials:', { userDto, user });
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    if (user.dataValues.isBlocked) {
      throw new HttpException('User is blocked', HttpStatus.FORBIDDEN);
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.dataValues.password,
    );

    if (passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Incorrect password or email' });
  }
}
