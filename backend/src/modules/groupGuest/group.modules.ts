import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupGuestController } from "./groupGuest.controller";
import { GroupGuest } from "./groupGuest.entity";
import { GroupGuestService } from "./groupGuest.service";

@Module({
  imports: [TypeOrmModule.forFeature([GroupGuest])],
  controllers: [GroupGuestController],
  providers: [GroupGuestService],
  exports: [GroupGuestService],
})
export class GroupGuestModule {}
