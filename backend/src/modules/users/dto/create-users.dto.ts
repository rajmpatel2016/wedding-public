import { IsString, IsEmail } from "class-validator";

export class CreateUsersDto {
  @IsString()
  readonly firstName?: string;
  @IsString()
  readonly lastName?: string;
  @IsString()
  readonly phone?: string;
  @IsString()
  readonly email?: string;
  @IsString()
  readonly password?: string;
}
