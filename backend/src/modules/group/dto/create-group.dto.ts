import { IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
  @IsString()
  readonly groupName?: string;

  @IsNumber()
  readonly weddingId?: number;
}
