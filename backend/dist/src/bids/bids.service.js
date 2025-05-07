"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const auction_gateway_1 = require("../auction/auction.gateway");
let BidsService = class BidsService {
    constructor(prisma, gateway) {
        this.prisma = prisma;
        this.gateway = gateway;
    }
    async placeBid(dto) {
        return this.prisma.$transaction(async (tx) => {
            const item = await tx.item.findUnique({
                where: { id: dto.itemId },
                include: { bids: { orderBy: { amount: 'desc' }, take: 1 } },
            });
            if (!item)
                throw new common_1.NotFoundException('Item not found');
            if (item.closed || item.endsAt < new Date())
                throw new common_1.BadRequestException('Auction has ended');
            const user = await tx.user.findUnique({
                where: { id: dto.userId },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const top = item.bids[0];
            if (top && Number(dto.amount) <= Number(top.amount))
                throw new common_1.BadRequestException('Bid must be higher than current highest');
            const bid = await tx.bid.create({ data: dto });
            this.gateway.broadcastBid(item.id, bid);
            return bid;
        });
    }
};
exports.BidsService = BidsService;
exports.BidsService = BidsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        auction_gateway_1.AuctionGateway])
], BidsService);
//# sourceMappingURL=bids.service.js.map