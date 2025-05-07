import { Server, Socket } from 'socket.io';
export declare class AuctionGateway {
    server: Server;
    handleJoin(itemId: number, socket: Socket): void;
    broadcastBid(itemId: number, bid: any): void;
}
