import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/auction', cors: { origin: '*' } })
export class AuctionGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody('itemId') itemId: number,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(String(itemId));
  }

  broadcastBid(itemId: number, bid: any) {
    this.server.to(String(itemId)).emit('new-bid', bid);
  }
}
