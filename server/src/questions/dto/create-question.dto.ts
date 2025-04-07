import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { QuestionType } from '../questions.model';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Question text is required' })
  readonly question: string;

  @IsOptional()
  readonly description?: string;

  @IsEnum(QuestionType, { message: 'Invalid question type' })
  readonly type: QuestionType;

  @IsOptional()
  @IsBoolean({ message: 'isRequired must be a boolean' })
  readonly isRequired?: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly order?: number;

  @IsOptional()
  @IsBoolean()
  readonly showInTable?: boolean = false;
}
