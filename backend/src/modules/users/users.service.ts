import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from "@nestjs/common";
import { Users } from "./users.entity";
import { CreateUsersDto } from "./dto/create-users.dto";
import { UpdateUsersDto } from "./dto/update-users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(createUsersDto: CreateUsersDto) {
    const user = this.usersRepository.create(createUsersDto);
    try {
      const newUser = this.usersRepository.save(user);
      return newUser;
    } catch (err) {
      console.log(err);
    }
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    const user = await this.usersRepository.preload({
      id: +id,
      ...updateUsersDto,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.usersRepository.remove(user);
  }

  async getEmail(email: string) {
    const user = await this.usersRepository.findOne({
      email: email.toLowerCase(),
    });

    return !!user;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException("User with this email does not exist");
    }
    return user;
  }

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new NotFoundException("User with id email does not exist");
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.getById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersRepository.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async removeRefreshToken(userId: number) {
    return this.usersRepository.update(userId, {
      currentHashedRefreshToken: null,
    });
  }
}
