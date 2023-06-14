import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MessageGroupController } from "./messageGroup.controller";
import { MessageGroup } from "./messageGroup.entity";
import { MessageGroupService } from "./messageGroup.service";

@Module({
  imports: [TypeOrmModule.forFeature([MessageGroup])],
  controllers: [MessageGroupController],
  providers: [MessageGroupService],
  exports: [MessageGroupService],
})
export class MessageGroupModule {}
