import { PrismaService } from '../prisma/prisma.service';
export declare class UsersController {
    private prisma;
    constructor(prisma: PrismaService);
    getUserBids(userId: number): Promise<{
        itemId: number;
        name: string;
        endsAt: Date;
        description: string;
        userBid: import("@prisma/client/runtime/library").Decimal;
        highestBid: import("@prisma/client/runtime/library").Decimal;
    }[]>;
}
