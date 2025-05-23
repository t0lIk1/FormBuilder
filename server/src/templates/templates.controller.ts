import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { AccessTemplatesGuard } from './access-templates.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { TagsService } from '../tags/tags.service';

@Controller('templates')
export class TemplatesController {
  constructor(
    private readonly templatesService: TemplatesService,
    private readonly tagsService: TagsService,
  ) {}

  @Get('search')
  async search(@Query('q') query: string) {
    return this.templatesService.searchTemplates(query);
  }

  @Get('tags/autocomplete')
  async autocompleteTags(@Query('prefix') prefix: string) {
    return this.tagsService.autocomplete(prefix);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTemplateDto, @Req() req: Request) {
    const user = req.user as { id: number };
    const { tags, ...templateDto } = dto;
    return this.templatesService.create(
      { ...templateDto, authorId: user.id },
      tags,
    );
  }

  @Get()
  findAll() {
    return this.templatesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  findAllByUser(@Req() req: Request) {
    const user = req.user as { id: number };
    return this.templatesService.findAllByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.templatesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateTemplateDto,
  ) {
    return this.templatesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.templatesService.remove(id);
  }

  @UseGuards(JwtAuthGuard, AccessTemplatesGuard)
  @Get(':id/questions')
  getTemplateQuestions(@Param('id', ParseIntPipe) id: number) {
    return this.templatesService.getTemplateQuestions(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/toggle-like')
  async toggleLike(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const user = req.user as { id: number };
    return this.templatesService.toggleLike(id, user.id);
  }
}
