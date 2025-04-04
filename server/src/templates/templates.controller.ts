import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTemplateDto, @Request() req) {
    return this.templatesService.create({ ...dto, userId: req.user.id });
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.templatesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, dto: CreateTemplateDto) {
    return this.templatesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.templatesService.remove(id);
  }

  @Get(':id/questions')
  getTemplateQuestions(@Param('id') id: number) {
    return this.templatesService.getTemplateQuestions(id);
  }
}
