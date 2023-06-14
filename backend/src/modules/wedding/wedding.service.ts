import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWeddingDto } from "./dto/create-wedding.dto";
import { UpdateWeddingDto } from "./dto/update-wedding.dto";
import { Wedding } from "./wedding.entity";

@Injectable()
export class WeddingService {
  constructor(
    @InjectRepository(Wedding)
    private readonly weddingRepository: Repository<Wedding>
  ) {}

  findAll() {
    return this.weddingRepository.find();
  }

  async findOne(id: number) {
    const message = await this.weddingRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  async findOneByUser(userId: number) {
    const message = await this.weddingRepository.findOne({ userId });
    if (!message) {
      throw new NotFoundException(`message #${userId} not found`);
    }
    return message;
  }

  create(createWeddingDto: CreateWeddingDto) {
    const message = this.weddingRepository.create(createWeddingDto);
    return this.weddingRepository.save(message);
  }

  async update(id: string, UpdateWeddingDto: UpdateWeddingDto) {
    const message = await this.weddingRepository.preload({
      id: +id,
      ...UpdateWeddingDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.weddingRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.weddingRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.weddingRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
