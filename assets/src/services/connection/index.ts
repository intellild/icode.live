import { Injectable, OnDestroy } from '@angular/core';
import { Channel } from 'phoenix';
import { BehaviorSubject } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { notNull } from '../../utils/not-null';
import { GithubService } from '../github.service';
import { ServerConnection, ServerConnectionState } from './server-connection';

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

  ngOnDestroy() {
    this.serverConnection$.getValue()?.destroy();
  }
}
