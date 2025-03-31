import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  getAll() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOneUser(Number(id));
  }

  @Delete('delete')
  delete(@Body() ids: number[]) {
    return this.usersService.deleteUsers(ids);
  }

  @Put('block')
  block(@Body() ids: number[]) {
    return this.usersService.blockUsers(ids);
  }

  @Put('unblock')
  unblock(@Body() ids: number[]) {
    return this.usersService.unBlockUsers(ids);
  }
}
