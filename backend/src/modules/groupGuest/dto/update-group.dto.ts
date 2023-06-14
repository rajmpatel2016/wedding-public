import { PartialType } from "@nestjs/mapped-types";
import { CreateGroupGuestDto } from "./create-groupGuest.dto";

export class UpdateGroupGuestDto extends PartialType(CreateGroupGuestDto) {}
