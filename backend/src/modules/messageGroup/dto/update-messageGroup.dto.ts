import { PartialType } from "@nestjs/mapped-types";
import { CreateMessageGroupDto } from "./create-messageGroup.dto";

export class UpdateMessageGroupDto extends PartialType(CreateMessageGroupDto) {}
