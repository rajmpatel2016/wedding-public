import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "@hapi/joi";
import { DatabaseModule } from "./modules/database/database.module";
import { AuthenticationModule } from "./modules/authentication/authentication.module";
import { MessageModule } from "./modules/message/message.modules";
import { GuestModule } from "./modules/guest/guest.modules";
import { WeddingModule } from "./modules/wedding/wedding.modules";
import { MealOptionModule } from "./modules/mealOption/message.modules";
import { GroupModule } from "./modules/group/group.modules";
import { GroupGuestModule } from "./modules/groupGuest/group.modules";
import { MessageGroupModule } from "./modules/messageGroup/messageGroup.modules";

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    AuthenticationModule,
    UsersModule,
    MessageModule,
    GuestModule,
    WeddingModule,
    MealOptionModule,
    GroupModule,
    GroupGuestModule,
    MessageGroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
