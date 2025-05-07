"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const items_module_1 = require("./items/items.module");
const bids_module_1 = require("./bids/bids.module");
const auction_gateway_1 = require("./auction/auction.gateway");
const schedule_1 = require("@nestjs/schedule");
const auction_scheduler_1 = require("./auction/auction.scheduler");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, schedule_1.ScheduleModule.forRoot(), items_module_1.ItemsModule, bids_module_1.BidsModule],
        providers: [auction_gateway_1.AuctionGateway, auction_scheduler_1.AuctionScheduler],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map