import { PartialType } from "@nestjs/mapped-types";
import { CreateMealOptionDto } from "./create-mealOption.dto";

export class UpdateMealOptionDto extends PartialType(CreateMealOptionDto) {}
