import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WeddingController } from "./wedding.controller";
import { Wedding } from "./wedding.entity";
import { WeddingService } from "./wedding.service";

@Module({
  imports: [TypeOrmModule.forFeature([Wedding])],
  controllers: [WeddingController],
  providers: [WeddingService],
  exports: [WeddingService],
})
export class WeddingModule {}
