import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { GroupService } from "./group.service";

@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get("byWeddingId/:id")
  findAllByWeddingId(@Param("id") id: number) {
    return this.groupService.findAllByWeddingId(id);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.groupService.findOne(id);
  }

  @Post()
  create(@Body() CreateGroupDto: CreateGroupDto) {
    return this.groupService.create(CreateGroupDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.groupService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.groupService.remove(id);
  }
}
