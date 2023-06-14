import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Get,
  Patch,
  Param,
} from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
import RegisterDto from "./dto/register.dto";
import RequestWithUser from "./requestWithUser.interface";
import { LocalAuthenticationGuard } from "./localAuthentication.guard";
import { UsersService } from "../users/users.service";
import JwtAuthenticationGuard from "./jwt-authentication.guard";
import JwtRefreshGuard from "./jwt-refresh.guard";

@Controller("authentication")
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService
  ) {}

  @Post("register")
  async register(@Body() registrationData: RegisterDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("log-in")
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(user.id);

    await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

    request.res.setHeader("Set-Cookie", [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    user.password = undefined;
    return { user, token: accessTokenCookie };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post("log-out")
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    await this.usersService.removeRefreshToken(request.user.id);
    request.res.setHeader(
      "Set-Cookie",
      this.authenticationService.getCookiesForLogOut()
    );
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() body) {
    return this.usersService.update(id, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtRefreshGuard)
  @Get("refresh")
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      request.user.id
    );

    request.res.setHeader("Set-Cookie", accessTokenCookie);
    return request.user;
  }
}
