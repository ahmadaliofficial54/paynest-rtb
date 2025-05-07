import { BidsService } from './bids.service';
import { CreateBidDto } from './dto/create-bid.dto';
export declare class BidsController {
    private readonly bidsService;
    constructor(bidsService: BidsService);
    create(dto: CreateBidDto): Promise<{
        id: number;
        amount: import("@prisma/client/runtime/library").Decimal;
        createdAt: Date;
        userId: number;
        itemId: number;
    }>;
}
