import { IsNumber, IsOptional } from "class-validator";

export class CreateGroupGuestDto {
  @IsNumber()
  @IsOptional()
  readonly guestId?: number;

  @IsNumber()
  @IsOptional()
  readonly groupId?: number;

  @IsNumber()
  @IsOptional()
  readonly weddingId?: number;
}
