import { PrismaService } from '../prisma/prisma.service';
export declare class AuctionScheduler {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    closeAuctions(): Promise<void>;
}
