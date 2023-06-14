import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from "@nestjs/common";
import { CreateMealOptionDto } from "./dto/create-mealOption.dto";
import { MealtOptionService } from "./mealOption.service";

@Controller("mealOption")
export class MealOptionController {
  constructor(private readonly mealtOptionService: MealtOptionService) {}

  @Get()
  findAll() {
    return this.mealtOptionService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.mealtOptionService.findOne(id);
  }

  @Get("findByWeddingId/:weddingId")
  findByWeddingId(@Param("weddingId") weddingId: number) {
    return this.mealtOptionService.findByWeddingId(weddingId);
  }

  @Post()
  create(@Body() CreateMealOptionDto: CreateMealOptionDto) {
    return this.mealtOptionService.create(CreateMealOptionDto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.mealtOptionService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.mealtOptionService.remove(id);
  }
}
