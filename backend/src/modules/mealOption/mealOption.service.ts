import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MealOption } from "./mealOption.entity";
import { CreateMealOptionDto } from "./dto/create-mealOption.dto";
import { UpdateMealOptionDto } from "./dto/update-mealOption.dto";

@Injectable()
export class MealtOptionService {
  constructor(
    @InjectRepository(MealOption)
    private readonly mealOptionRepository: Repository<MealOption>
  ) {}

  findAll() {
    return this.mealOptionRepository.find();
  }

  async findOne(id: number) {
    const message = await this.mealOptionRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  findByWeddingId(weddingId) {
    return this.mealOptionRepository.find({ weddingId });
  }

  create(createMealOptionDto: CreateMealOptionDto) {
    const message = this.mealOptionRepository.create(createMealOptionDto);
    return this.mealOptionRepository.save(message);
  }

  async update(id: string, UpdateMealOptionDto: UpdateMealOptionDto) {
    const message = await this.mealOptionRepository.preload({
      id: +id,
      ...UpdateMealOptionDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.mealOptionRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.mealOptionRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.mealOptionRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
