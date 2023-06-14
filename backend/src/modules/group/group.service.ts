import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./group.entity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>
  ) {}

  findAll() {
    return this.groupRepository.find();
  }

  findAllByWeddingId(weddingId) {
    return this.groupRepository.find({ weddingId });
  }

  async findOne(id: number) {
    const message = await this.groupRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  create(createGroupDto: CreateGroupDto) {
    const message = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(message);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const message = await this.groupRepository.preload({
      id: +id,
      ...updateGroupDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.groupRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.groupRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.groupRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
