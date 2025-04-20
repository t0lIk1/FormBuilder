// submit-form.dto.ts
import { IsArray, IsNotEmpty, IsNumber, ValidateNested, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsNumber()
  questionId: number;

  @IsNotEmpty()
  @IsOptional()
  value: string | string[];
}

export class SubmitFormDto {
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
