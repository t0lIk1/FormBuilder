import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { QuestionType } from '../../types/enum';
import { Transform } from 'class-transformer';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Question text is required' })
  @IsString()
  question: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty({ message: 'Question type is required' })
  @Transform(({ value }: { value: string }) => value?.toUpperCase())
  @IsEnum(QuestionType, { message: 'Invalid question type' })
  type: QuestionType;

  @IsOptional()
  @IsArray()
  options?: string[];

  @IsOptional()
  @IsBoolean({ message: 'isRequired must be a boolean' })
  isRequired?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;

  @IsOptional()
  @IsBoolean()
  showInTable?: boolean = false;
}
