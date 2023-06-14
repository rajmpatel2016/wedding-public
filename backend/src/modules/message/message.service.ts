import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { Message } from "./message.entity";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) {}

  findAll() {
    return this.messageRepository.find();
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  create(createmessagesDto: CreateMessageDto) {
    const message = this.messageRepository.create(createmessagesDto);
    return this.messageRepository.save(message);
  }

  async update(id: string, UpdateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepository.preload({
      id: +id,
      ...UpdateMessageDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.messageRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.messageRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.messageRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
