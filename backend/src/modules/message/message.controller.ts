import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import { CreateMessageDto } from "./dto/create-message.dto";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findAll() {
    return this.messageService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.messageService.findOne(id);
  }

  @Post()
  create(@Body() CreateMessageDto: CreateMessageDto) {
    return this.messageService.create(CreateMessageDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.messageService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.messageService.remove(id);
  }
}
