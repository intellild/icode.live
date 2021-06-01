import { Channel, Socket } from 'phoenix';
import { BehaviorSubject, Subject } from 'rxjs';
import { UNAUTHORIZED } from '../../constants';
import { environment } from '../../environments/environment';
import { Me_viewer } from '../__generated__/Me';
import { token } from '../github.service';

function getUrl() {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  return environment.production
    ? `${protocol}://socket.icode.live/socket`
    : `${protocol}://${location.hostname}:4000/socket`;
}

export enum ServerConnectionState {
  Connecting = 'connecting',
  Authorizing = 'authorizing',
  Connected = 'connected',
  Unauthorized = 'unauthorized',
}

export class ServerConnection {
  readonly socket = new Socket(getUrl(), {
    heartbeatIntervalMs: 30000,
    params: {
      token,
      version: 1,
    },
  });

  readonly userChannel: Channel;

  readonly state$ = new BehaviorSubject<ServerConnectionState>(ServerConnectionState.Connecting);
  readonly error$ = new Subject<unknown>();

  private lastError: unknown | null = null;

  constructor(user: Me_viewer) {
    this.userChannel = this.socket.channel(`user:${user.login}`);
    this.socket.onOpen(() => this.state$.next(ServerConnectionState.Authorizing));
    this.socket.onError((error) => {
      this.lastError = error;
      this.error$.next(error);
      this.state$.next(ServerConnectionState.Connecting);
    });
    this.userChannel.onError((reason) => {
      this.state$.next(ServerConnectionState.Unauthorized);
      this.lastError = reason;
      this.error$.next(reason);
    });
    this.userChannel
      .join()
      .receive('ok', () => {
        this.state$.next(ServerConnectionState.Connected);
        this.lastError = null;
      })
      .receive('error', (reason) => {
        this.state$.next(ServerConnectionState.Unauthorized);
        this.lastError = reason;
        this.error$.next(reason);
        this.userChannel.leave();
      });
    this.socket.connect();
  }

  getLastError(): unknown {
    return this.lastError;
  }

  destroy() {
    this.userChannel.leave();
    this.socket.disconnect();
  }
}
