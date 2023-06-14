import {
  IsString,
  IsEmail,
  IsNumber,
  IsBoolean,
  IsOptional,
} from "class-validator";

export class CreateGuestDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsString()
  @IsOptional()
  readonly phoneNumber?: string;

  @IsBoolean()
  @IsOptional()
  readonly rsvp?: boolean;

  @IsNumber()
  @IsOptional()
  readonly guests?: number;

  @IsNumber()
  @IsOptional()
  readonly weddingId?: number;

  @IsString()
  @IsOptional()
  readonly mealOptionId?: string;

  @IsString()
  @IsOptional()
  readonly address?: string;
}
