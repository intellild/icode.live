import { Injectable } from '@angular/core';
import { GithubService } from '../github.service';
import { ServerConnection } from './server-connection';

@Injectable()
export class ConnectionService {
  private initialized = false;
  serverConnection: ServerConnection | null = null;

  constructor(private readonly githubService: GithubService) {}

  channel(id: string) {
    return this.serverConnection?.socket.channel(id);
  }

  async initialize() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const me = await this.githubService.getMe().result();
    this.serverConnection = new ServerConnection(me.data.viewer);
  }
}
