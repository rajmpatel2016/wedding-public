import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MealOptionController } from "./mealOption.controller";
import { MealOption } from "./mealOption.entity";
import { MealtOptionService } from "./mealOption.service";

@Module({
  imports: [TypeOrmModule.forFeature([MealOption])],
  controllers: [MealOptionController],
  providers: [MealtOptionService],
  exports: [MealtOptionService],
})
export class MealOptionModule {}
