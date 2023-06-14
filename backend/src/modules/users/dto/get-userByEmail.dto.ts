import { IsString } from "class-validator";

export class GetUserByEmailDto {
  @IsString()
  readonly email?: string;
}
