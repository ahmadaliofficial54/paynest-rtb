import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { BidsController } from './bids.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuctionGateway } from '../auction/auction.gateway';

@Module({
  imports: [PrismaModule],
  controllers: [BidsController],
  providers: [BidsService, AuctionGateway],
})
export class BidsModule {}
