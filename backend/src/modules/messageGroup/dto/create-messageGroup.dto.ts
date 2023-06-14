import { IsString, IsNumber, IsBoolean, IsOptional } from "class-validator";

export class CreateMessageGroupDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly date?: string;

  @IsString()
  @IsOptional()
  readonly time?: string;

  @IsString()
  @IsOptional()
  readonly message?: string;

  @IsNumber()
  @IsOptional()
  readonly groupId?: number;

  @IsNumber()
  @IsOptional()
  readonly weddingId?: number;

  @IsBoolean()
  @IsOptional()
  readonly scheduled?: boolean;

  @IsBoolean()
  @IsOptional()
  readonly sent?: boolean;
}
