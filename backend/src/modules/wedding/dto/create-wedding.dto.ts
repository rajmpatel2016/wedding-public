import {
  IsString,
  IsEmail,
  IsNumber,
  IsDate,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateWeddingDto {
  @IsString()
  @IsOptional()
  readonly date?: string;

  @IsNumber()
  @IsOptional()
  readonly time?: string;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsOptional()
  @IsBoolean()
  readonly mealResponses?: boolean;

  @IsNumber()
  readonly userId?: number;

  @IsBoolean()
  @IsOptional()
  readonly rsvps?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly trial?: boolean;

  @IsString()
  @IsOptional()
  readonly status?: string;
}
