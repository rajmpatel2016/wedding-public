import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MessageGroup } from "./messageGroup.entity";
import { CreateMessageGroupDto } from "./dto/create-messageGroup.dto";
import { UpdateMessageGroupDto } from "./dto/update-messageGroup.dto";

@Injectable()
export class MessageGroupService {
  constructor(
    @InjectRepository(MessageGroup)
    private readonly messageGroupRepository: Repository<MessageGroup>
  ) {}

  findAll() {
    return this.messageGroupRepository.find();
  }

  findByGroupId(groupId) {
    return this.messageGroupRepository.find({ groupId });
  }

  findByWeddingId(weddingId) {
    return this.messageGroupRepository.find({ weddingId });
  }

  async findOne(id: number) {
    const message = await this.messageGroupRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  create(createMessageGroupDto: CreateMessageGroupDto) {
    const message = this.messageGroupRepository.create(createMessageGroupDto);
    return this.messageGroupRepository.save(message);
  }

  async update(id: string, updateMessageGroupDto: UpdateMessageGroupDto) {
    const message = await this.messageGroupRepository.preload({
      id: +id,
      ...updateMessageGroupDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.messageGroupRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.messageGroupRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.messageGroupRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
