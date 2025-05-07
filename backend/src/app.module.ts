import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module'; // <-- correct path
import { ItemsModule } from './items/items.module';
import { BidsModule } from './bids/bids.module';
import { AuctionGateway } from './auction/auction.gateway';
import { ScheduleModule } from '@nestjs/schedule';
import { AuctionScheduler } from './auction/auction.scheduler';

@Module({
  imports: [PrismaModule, ScheduleModule.forRoot(), ItemsModule, BidsModule],
  providers: [AuctionGateway, AuctionScheduler],
})
export class AppModule {}
