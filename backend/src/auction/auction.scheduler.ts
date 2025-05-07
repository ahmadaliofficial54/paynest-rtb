import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuctionScheduler {
  private readonly logger = new Logger(AuctionScheduler.name);

  constructor(private readonly prisma: PrismaService) {}

  // Run every 30 seconds to close expired auctions
  @Cron('*/30 * * * * *')
  async closeAuctions(): Promise<void> {
    try {
      const now = new Date();

      const { count } = await this.prisma.item.updateMany({
        where: {
          closed: false,
          endsAt: { lt: now },
        },
        data: {
          closed: true,
        },
      });

      if (count > 0) {
        this.logger.log(
          `✅ Closed ${count} expired auction(s) at ${now.toISOString()}`,
        );
      }
    } catch (error) {
      this.logger.error('❌ Failed to close auctions:', error);
    }
  }
}
