import { IsString, IsEmail, IsNumber, IsOptional } from "class-validator";

export class CreateMessageDto {
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
  readonly guestId?: number;
}
