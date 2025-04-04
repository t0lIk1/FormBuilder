import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTemplateDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  topic: string;

  // @IsOptional()
  // @IsString()
  // imageUrl?: string;

  @IsNotEmpty() // Добавляем явное указание, что поле обязательно
  @IsBoolean()
  isPublic: boolean; // Убираем "?" - делаем обязательным

  // @IsArray()
  // tags: string[];

  @IsNotEmpty()
  userId: number;
}
