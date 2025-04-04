import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  // @Roles('ADMIN')
  // @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':email')
  getOne(@Param('email') email: string) {
    return this.usersService.findOneUser(email);
  }

  @Delete('delete')
  delete(@Body() body: { ids: number[] }) {
    return this.usersService.deleteUsers(body.ids);
  }

  @Put('block')
  block(@Body() body: { ids: number[] }) {
    return this.usersService.blockUsers(body.ids);
  }

  @Put('unblock')
  unblock(@Body() body: { ids: number[] }) {
    return this.usersService.unBlockUsers(body.ids);
  }
}
