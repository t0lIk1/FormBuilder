import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionDto } from 'src/questions/dto/create-question.dto';
import { Type } from 'class-transformer';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  declare title: string;

  @IsNotEmpty()
  @IsString()
  declare description: string;

  @IsNotEmpty()
  @IsString()
  declare topic: string;

  // @IsOptional()
  // @IsString()
  // imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  declare isPublic: boolean;

  @IsOptional()
  @IsNumber()
  declare authorId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  declare tags?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions?: CreateQuestionDto[];
}
