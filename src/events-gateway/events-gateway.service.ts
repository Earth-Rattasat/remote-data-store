import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: true,
})
export class EventsGatewayService {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  listenForMessages(@MessageBody() data: string) {
    this.server.sockets.emit('server_message', 'eiei');
  }

  sendMessageToClients(key: string, data: any) {
    try {
      this.server.sockets.emit(key, data);
    } catch (error) {
      throw new Error(error);
    }
  }
}
