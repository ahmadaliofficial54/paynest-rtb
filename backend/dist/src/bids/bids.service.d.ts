import { PrismaService } from '../prisma/prisma.service';
import { CreateBidDto } from './dto/create-bid.dto';
import { AuctionGateway } from '../auction/auction.gateway';
export declare class BidsService {
    private prisma;
    private gateway;
    constructor(prisma: PrismaService, gateway: AuctionGateway);
    placeBid(dto: CreateBidDto): Promise<{
        id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        userId: number;
        itemId: number;
    }>;
}
