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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersController = class UsersController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserBids(userId) {
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
        const seen = new Set();
        const unique = bids.filter((b) => {
            if (seen.has(b.itemId))
                return false;
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
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(':id/bids'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserBids", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersController);
//# sourceMappingURL=users.controller.js.map