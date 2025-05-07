import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { AuctionGateway } from '../auction/auction.gateway';

@Injectable()
export class BidsService {
  constructor(
    private prisma: PrismaService,
    private gateway: AuctionGateway,
  ) {}

  async placeBid(dto: CreateBidDto) {
    return this.prisma.$transaction(async (tx) => {
      const item = await tx.item.findUnique({
        where: { id: dto.itemId },
        include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
      });

      if (!item) throw new NotFoundException('Item not found');
      if (item.closed || item.endsAt < new Date())
        throw new BadRequestException('Auction has ended');

      // ✅ Validate user exists
      const user = await tx.user.findUnique({
        where: { id: dto.userId },
      });
      if (!user) throw new NotFoundException('User not found');

      const top = item.bids[0];
      if (top && Number(dto.amount) <= Number(top.amount))
        throw new BadRequestException(
          'Bid must be higher than current highest',
        );

      const bid = await tx.bid.create({ data: dto });

      this.gateway.broadcastBid(item.id, bid);
      return bid;
    });
  }
}
