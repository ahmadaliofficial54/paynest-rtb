"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidsModule = void 0;
const common_1 = require("@nestjs/common");
const bids_service_1 = require("./bids.service");
const bids_controller_1 = require("./bids.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const auction_gateway_1 = require("../auction/auction.gateway");
let BidsModule = class BidsModule {
};
exports.BidsModule = BidsModule;
exports.BidsModule = BidsModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [bids_controller_1.BidsController],
        providers: [bids_service_1.BidsService, auction_gateway_1.AuctionGateway],
    })
], BidsModule);
//# sourceMappingURL=bids.module.js.map