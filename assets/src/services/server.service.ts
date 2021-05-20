import { Injectable } from '@angular/core';
import { Socket } from 'phoenix';
import { environment } from '../environments/environment';
import { token, UserService } from './user.service';

function getUrl() {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  return environment.production
    ? `${protocol}://socket.icode.live/socket`
    : `${protocol}://${location.hostname}:4000/socket`;
}

@Injectable()
export class ServerService {
  socket = new Socket(getUrl(), {
    heartbeatIntervalMs: 30000,
    params: {
      token,
      version: 1,
    },
  });

  constructor(private readonly userService: UserService) {
    this.socket.onOpen(this.onOpen);
    this.socket.onError(this.onError);
  }

  connect() {
    this.socket.connect();
  }

  private readonly onOpen = () => {};

  private readonly onError = () => {};
}
