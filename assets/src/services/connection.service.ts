import { Injectable, OnDestroy } from '@angular/core';
import { Channel } from 'phoenix';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { notNull } from '../utils/not-null';
import { ServerConnection, ServerConnectionState } from './connection/server-connection';
import { GithubService } from './github.service';

@Injectable()
export class ConnectionService implements OnDestroy {
  private initialized = false;
  readonly serverConnection$ = new BehaviorSubject<ServerConnection | null>(null);

  constructor(private readonly githubService: GithubService) {}

  channel(topic: string): Promise<Channel> {
    return this.serverConnection$
      .pipe(filter(notNull), take(1))
      .toPromise()
      .then((serverConnection) => serverConnection.socket.channel(topic));
  }

  getServerConnectionState() {
    return this.serverConnection$.getValue()?.state$.getValue() ?? ServerConnectionState.Connecting;
  }

  async initialize() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const me = await this.githubService.getMe().result();
    this.serverConnection$.next(new ServerConnection(me.data.viewer));
  }

  ensureServerConnection(): Promise<ServerConnection> {
    const serverConnection = this.serverConnection$.getValue();
    if (serverConnection) {
      return Promise.resolve(serverConnection);
    }
    return this.serverConnection$.pipe(filter(notNull), take(1)).toPromise();
  }

  ngOnDestroy() {
    this.serverConnection$.getValue()?.destroy();
  }
}
