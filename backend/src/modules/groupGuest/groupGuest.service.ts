import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupGuestDto } from "./dto/create-groupGuest.dto";
import { UpdateGroupGuestDto } from "./dto/update-group.dto";
import { GroupGuest } from "./groupGuest.entity";

@Injectable()
export class GroupGuestService {
  constructor(
    @InjectRepository(GroupGuest)
    private readonly groupGuestRepository: Repository<GroupGuest>
  ) {}

  findAll() {
    return this.groupGuestRepository.find();
  }

  findByWeddingId(weddingId) {
    return this.groupGuestRepository.find({ weddingId });
  }

  async findOne(id: number) {
    const message = await this.groupGuestRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  async findAllByGroup(id: number) {
    const group = await this.groupGuestRepository.find({ groupId: id });
    if (!group) {
      throw new NotFoundException(`group #${id} not found`);
    }
    return group;
  }

  create(createGroupGuestDto: CreateGroupGuestDto) {
    const message = this.groupGuestRepository.create(createGroupGuestDto);
    return this.groupGuestRepository.save(message);
  }

  async update(id: string, updateGroupGuestDto: UpdateGroupGuestDto) {
    const message = await this.groupGuestRepository.preload({
      id: +id,
      ...updateGroupGuestDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.groupGuestRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.groupGuestRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.groupGuestRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
