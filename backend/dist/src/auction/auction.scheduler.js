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
var AuctionScheduler_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionScheduler = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
let AuctionScheduler = AuctionScheduler_1 = class AuctionScheduler {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AuctionScheduler_1.name);
    }
    async closeAuctions() {
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
                this.logger.log(`✅ Closed ${count} expired auction(s) at ${now.toISOString()}`);
            }
        }
        catch (error) {
            this.logger.error('❌ Failed to close auctions:', error);
        }
    }
};
exports.AuctionScheduler = AuctionScheduler;
__decorate([
    (0, schedule_1.Cron)('*/30 * * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuctionScheduler.prototype, "closeAuctions", null);
exports.AuctionScheduler = AuctionScheduler = AuctionScheduler_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuctionScheduler);
//# sourceMappingURL=auction.scheduler.js.map