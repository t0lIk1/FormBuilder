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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReorderQuestionsDto } from './dto/reorder-question.dto';
import { AccessTemplatesGuard } from '../templates/access-templates.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/templates/:templateId/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Post()
  create(
    @Param('templateId') templateId: number,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.create(templateId, dto);
  }

  @Get()
  findAll(@Param('templateId') templateId: number) {
    return this.questionsService.findAllByTemplate(templateId);
  }

  @Get(':id')
  findOne(@Param('templateId') templateId: number, @Param('id') id: number) {
    return this.questionsService.findOne(templateId, id);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Put(':id')
  update(
    @Param('templateId') templateId: number,
    @Param('id') id: number,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.questionsService.update(templateId, id, dto);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Delete(':id')
  remove(@Param('templateId') templateId: number, @Param('id') id: number) {
    return this.questionsService.remove(templateId, id);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Post('reorder')
  reorder(
    @Param('templateId') templateId: number,
    @Body() reorderDto: ReorderQuestionsDto,
  ) {
    return this.questionsService.reorder(templateId, reorderDto);
  }
}
