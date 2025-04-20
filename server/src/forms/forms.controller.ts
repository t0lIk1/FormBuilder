import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { SubmitFormDto } from './dto/submit-form.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('templates/:templateId/forms')
@UseGuards(JwtAuthGuard)
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post('submit')
  async submitForm(
    @Body() dto: SubmitFormDto,
    @Req() req: Request,
    @Param('templateId', ParseIntPipe) templateId: number,
  ) {
    const user = req.user as { id: number };
    console.log(user.id);
    return this.formsService.submitForm(
      {
        ...dto,
        userId: user.id,
      },
      templateId,
    );
  }
  //
  // @Get('responses/:id')
  // getFormResponse(@Param('id', ParseIntPipe) id: number) {
  //   return this.formsService.getFormResponse(id);
  // }
  //
  // @Get('user')
  // getUserResponses(@Req() req: Request) {
  //   const user = req.user as { id: number };
  //   return this.formsService.getUserResponses(user.id);
  // }
  //
  // @Get('template-responses')
  // getTemplateResponses(@Param('templateId', ParseIntPipe) templateId: number) {
  //   return this.formsService.getTemplateResponses(templateId);
  // }
  //
  // @Put('update/:id')
  // async updateFormResponse(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body() dto: SubmitFormDto,
  //   @Req() req: Request,
  // ) {
  //   const user = req.user as { id: number };
  //   return this.formsService.updateFormResponse(id, dto, user.id);
  // }
}
