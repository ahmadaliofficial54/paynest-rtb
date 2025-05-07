import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get(':id/bids')
  async getUserBids(@Param('id', ParseIntPipe) userId: number) {
    const bids = await this.prisma.bid.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        item: {
          include: {
            bids: { orderBy: { amount: 'desc' }, take: 1 },
          },
        },
      },
    });

    // Deduplicate by item ID (user might have multiple bids)
    const seen = new Set();
    const unique = bids.filter((b) => {
      if (seen.has(b.itemId)) return false;
      seen.add(b.itemId);
      return true;
    });

    return unique.map((bid) => ({
      itemId: bid.item.id,
      name: bid.item.name,
      endsAt: bid.item.endsAt,
      description: bid.item.description,
      userBid: bid.amount,
      highestBid: bid.item.bids[0]?.amount ?? bid.item.startPrice,
    }));
  }
}
