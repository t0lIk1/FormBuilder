import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionType } from '../types/enum';

interface SubmitFormDto {
  answers: {
    questionId: number;
    value: string;
  }[];
}

@Controller('templates/:templateId/forms')
@UseGuards(JwtAuthGuard)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('submit')
  async submitForm(
    @Body() dto: SubmitFormDto,
    @Request() req,
    @Param('templateId') templateId: number,
  ) {
    return this.formsService.submitForm({
      templateId: Number(templateId), // Правильное преобразование и передача параметра
      ...dto,
      userId: req.user.id,
    });
  }

  @Get('responses/:id')
  async getFormResponse(@Param('id') id: string) {
    return this.formsService.getFormResponse(Number(id));
  }

  @Get('my-responses')
  async getUserResponses(@Request() req) {
    return this.formsService.getUserResponses(req.user.id);
  }

  @Get('template-responses')
  async getTemplateResponses(@Param('templateId') templateId: string) {
    return this.formsService.getTemplateResponses(Number(templateId));
  }
}
