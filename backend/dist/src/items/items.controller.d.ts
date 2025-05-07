import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    create(dto: CreateItemDto): import(".prisma/client").Prisma.Prisma__ItemClient<{
        id: number;
        name: string;
        description: string;
        startPrice: import("@prisma/client/runtime/library").Decimal;
        endsAt: Date;
        closed: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        bids: {
            id: number;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            userId: number;
            itemId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        startPrice: import("@prisma/client/runtime/library").Decimal;
        endsAt: Date;
        closed: boolean;
        createdAt: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__ItemClient<{
        bids: {
            id: number;
            createdAt: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            userId: number;
            itemId: number;
        }[];
    } & {
        id: number;
        name: string;
        description: string;
        startPrice: import("@prisma/client/runtime/library").Decimal;
        endsAt: Date;
        closed: boolean;
        createdAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
