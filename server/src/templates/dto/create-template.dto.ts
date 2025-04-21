import {
  IsArray,
  IsBoolean,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  declare userId: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  declare tags?: string[];
}
