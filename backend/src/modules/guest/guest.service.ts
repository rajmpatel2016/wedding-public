import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Guest } from "./guest.entity";
import { CreateGuestDto } from "./dto/create-guest.dto";
import { UpdateGuestDto } from "./dto/update-guest.dto";

@Injectable()
export class GuestService {
  constructor(
    @InjectRepository(Guest)
    private readonly guestRepository: Repository<Guest>
  ) {}

  findAll() {
    return this.guestRepository.find();
  }

  findAllByWeddingId(weddingId) {
    return this.guestRepository.find({ weddingId });
  }

  async findOne(id: number) {
    const message = await this.guestRepository.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return message;
  }

  create(createMessagesDto: CreateGuestDto) {
    const message = this.guestRepository.create(createMessagesDto);
    return this.guestRepository.save(message);
  }

  async update(id: string, UpdateMessageDto: UpdateGuestDto) {
    const message = await this.guestRepository.preload({
      id: +id,
      ...UpdateMessageDto,
    });
    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }
    return this.guestRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`message #${id} not found`);
    }
    return this.guestRepository.remove(message);
  }

  async getById(id: number) {
    const message = await this.guestRepository.findOne({ id });
    if (message) {
      return message;
    }
    throw new NotFoundException("message with id email does not exist");
  }

  async webhook(body: any) {
    console.log("vou achei", body);

    const guest = await this.guestRepository.findOne({
      phoneNumber: body.From,
    });
    console.log("achei", guest);

    if (guest) {
      const response = body.Body.indexOf("1") !== -1 ? true : false;
      console.log("vou update", response);
      const newGuest = await this.guestRepository.preload({
        id: guest.id,
        rsvp: response,
      });
      if (!newGuest) {
        throw new NotFoundException(`newGuest  not found`);
      }
      return this.guestRepository.save(newGuest);
    }
    throw new NotFoundException("message with id email does not exist");
  }
}
