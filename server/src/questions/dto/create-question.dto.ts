import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  ValidateIf,
} from 'class-validator';
import { QuestionType } from '../questions.model';

export class CreateQuestionDto {
  @IsNotEmpty({ message: 'Текст вопроса обязателен' })
  readonly question: string;

  @IsOptional()
  readonly description?: string;

  @IsEnum(QuestionType, { message: 'Недопустимый тип вопроса' })
  readonly type: QuestionType;

  @IsOptional()
  @IsBoolean({ message: 'isRequired должно быть boolean' })
  readonly isRequired?: boolean;

  @ValidateIf((o) => o.type === QuestionType.SELECT)
  @ArrayMinSize(1, { message: 'Для SELECT-вопроса нужен хотя бы один вариант' })
  readonly options?: string[];
}
