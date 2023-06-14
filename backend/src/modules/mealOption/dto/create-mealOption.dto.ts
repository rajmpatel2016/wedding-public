import { IsString, IsNumber, IsOptional } from "class-validator";

export class CreateMealOptionDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNumber()
  @IsOptional()
  readonly number?: number;

  @IsNumber()
  @IsOptional()
  readonly counter?: number;

  @IsNumber()
  @IsOptional()
  readonly weddingId?: number;
}
