import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { GuestService } from "./guest.service";

@Controller("guest")
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get()
  findAll() {
    return this.guestService.findAll();
  }

  @Get("byWeddingId/:id")
  findAllByWeddingId(@Param("id") id: number) {
    return this.guestService.findAllByWeddingId(id);
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.guestService.findOne(id);
  }

  @Post()
  create(@Body() CreateGuestDto: CreateGuestDto) {
    return this.guestService.create(CreateGuestDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.guestService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.guestService.remove(id);
  }

  @Post("webhook")
  webhook(@Body() webhook: any) {
    console.log("params", webhook);
    return this.guestService.webhook(webhook);
  }
}
