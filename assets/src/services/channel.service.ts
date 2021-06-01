import { Injectable, OnDestroy } from '@angular/core';
import { Channel } from 'phoenix';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConnectionService } from './connection';
import { GithubService } from './github.service';

@Injectable()
export class ChannelService implements OnDestroy {
  private lastError: unknown = null;
  readonly error$ = new Subject<unknown>();
  readonly connected$ = new BehaviorSubject(false);
  channel: Channel | null = null;

  constructor(private readonly connectionService: ConnectionService, private readonly githubService: GithubService) {}

  async connect(id: string) {
    const me = await this.githubService.getMe().result();
    if (me.data.viewer.login === id) {
      const channel = await this.connectionService.channel(`code:${id}`);
      this.channel = channel;
      channel.onError((reason) => {
        this.lastError = reason;
        this.error$.next(reason);
      });
      channel
        .join()
        .receive('ok', () => {
          this.connected$.next(true);
        })
        .receive('error', (reason) => {
          channel.leave();
          this.error$.next(reason);
        });
    }
  }

  ngOnDestroy() {
    this.channel?.leave();
  }
}
