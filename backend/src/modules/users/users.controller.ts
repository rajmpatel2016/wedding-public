import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUsersDto } from "./dto/create-users.dto";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";
import { RolesGuard } from "./roles.guard";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";
import { GetUserByEmailDto } from "./dto/get-userByEmail.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() CreateUsersDto: CreateUsersDto) {
    return this.usersService.create(CreateUsersDto);
  }

  @Post("/getUserByEmail")
  getEmail(@Body() body: GetUserByEmailDto) {
    return this.usersService.getEmail(body.email);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.usersService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.usersService.remove(id);
  }
}
