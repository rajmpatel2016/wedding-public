import { IsNumber } from "class-validator";

export class GetUserByGroupId {
  @IsNumber()
  readonly groupId?: number;
}
