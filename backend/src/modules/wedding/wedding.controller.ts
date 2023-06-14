import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { WeddingService } from "./wedding.service";

@Controller("wedding")
export class WeddingController {
  constructor(private readonly weddingService: WeddingService) {}

  @Get()
  findAll() {
    return this.weddingService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.weddingService.findOne(id);
  }

  @Get("weddingByUser/:id")
  findWeddingByUser(@Param("id") id: number) {
    return this.weddingService.findOneByUser(id);
  }

  @Post()
  create(@Body() CreateWeddingDto: CreateWeddingDto) {
    return this.weddingService.create(CreateWeddingDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.weddingService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.weddingService.remove(id);
  }
}
