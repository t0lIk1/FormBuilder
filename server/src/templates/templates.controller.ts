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
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { AccessTemplatesGuard } from './access-templates.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTemplateDto, @Req() req: Request) {
    const user = req.user as { id: number };
    return this.templatesService.create({ ...dto, userId: user.id });
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.templatesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Put(':id')
  update(@Param('id') id: number, dto: CreateTemplateDto) {
    return this.templatesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.templatesService.remove(id);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Get(':id/questions')
  getTemplateQuestions(@Param('id') id: number) {
    return this.templatesService.getTemplateQuestions(id);
  }
}
