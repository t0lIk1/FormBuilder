import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async update(@Req() req: Request, @Body() dto: CreateUserDto) {
    const user = req.user as { id: number };
    return this.usersService.updateUser(dto, user.id);
  }

  @Get()
  getAll() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('now')
  getUser(@Req() req: Request) {
    const user = req.user as { id: number };
    return this.usersService.findByToken(user.id);
  }

  @Get('email/:email')
  getOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneUser(email);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete('delete')
  delete(@Body() body: { ids: number[] }) {
    return this.usersService.deleteUsers(body.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete/me')
  deleteMe(@Req() req: Request) {
    const user = req.user as { id: number };
    return this.usersService.deleteMe(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('block')
  block(@Body() body: { ids: number[] }) {
    return this.usersService.blockUsers(body.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('unblock')
  unblock(@Body() body: { ids: number[] }) {
    return this.usersService.unBlockUsers(body.ids);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put('admin/toggle-roles')
  async toggleRole(@Body() body: { ids: number[] }) {
    const result = await this.usersService.toggleUsersRole(body.ids);
    return {
      message: 'Roles toggle success',
      ...result,
    };
  }
}
