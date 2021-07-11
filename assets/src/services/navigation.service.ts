import { Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(private readonly router: Router) {}

  hostChannel(channel: string, gist: string | undefined) {
    return this.channel(channel, {
      gist,
    });
  }

  guestChannel(channel: string) {
    return this.channel(channel);
  }

  private channel(channel: string, queryParams?: Params) {
    return this.router.navigate(['/channel', channel], {
      queryParams,
    });
  }
}
