import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SubmitFormDto } from './dto/submit-form.dto';
import { Request } from 'express';

@Controller('templates/:templateId/forms')
@UseGuards(JwtAuthGuard)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('submit')
  async submitForm(
    @Body() dto: SubmitFormDto,
    @Req() req: Request,
    @Param('templateId') templateId: number,
  ) {
    const user = req.user as { id: number };

    return this.formsService.submitForm({
      templateId: Number(templateId),
      ...dto,
      userId: user.id,
    });
  }

  @Get('responses/:id')
  getFormResponse(
    @Param('id')
    id: string,
  ) {
    return this.formsService.getFormResponse(Number(id));
  }

  @Get('user')
  getUserResponses(
    @Req()
    req: Request,
  ) {
    const user = req.user as { id: number };
    return this.formsService.getUserResponses(user.id);
  }

  @Get('template-responses')
  getTemplateResponses(
    @Param('templateId')
    templateId: string,
  ) {
    return this.formsService.getTemplateResponses(Number(templateId));
  }
}
