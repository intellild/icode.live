import { Injectable } from '@angular/core';
import { Channel } from 'phoenix';
import { Subject } from 'rxjs';
import { ConnectionService } from './connection';
import { GithubService } from './github.service';

@Injectable()
export class ChannelService {
  private lastError: unknown = null;
  readonly error$ = new Subject<unknown>();
  channel: Channel | null = null;

  constructor(private readonly connectionService: ConnectionService, private readonly githubService: GithubService) {}

  async connect(id: string) {
    const me = await this.githubService.getMe().result();
    if (me.data.viewer.login === id) {
      const channel = this.connectionService.channel(id);
      if (!channel) {
        throw new Error();
      }
      this.channel = channel;
      channel.onError((reason) => {
        this.lastError = reason;
        this.error$.next(reason);
      });
    }
  }
}
