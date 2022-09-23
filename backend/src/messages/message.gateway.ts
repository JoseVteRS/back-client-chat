import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessageService } from './message.service';

@WebSocketGateway({ cors: true })
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messageService.registerClient(client, payload.id);
      console.log(`Client connected ${client.id}`);
    } catch (error) {
      client.disconnect();
      return;
    }

    this.wss.emit('clients-updated', this.messageService.getConnectedClients());
  }

  handleDisconnect(client: Socket) {
    this.messageService.removeClient(client.id);
    this.wss.emit('clients-updated', this.messageService.getConnectedClients());
    console.log(`Client disconnected ${client.id}`);
  }

  @SubscribeMessage('message-from-clinet')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    this.wss.emit('message-from-server', {
      username: this.messageService.getUserFullName(client.id),
      message: payload.message || 'no_message',
    });
    console.log(payload.message);
  }
}
