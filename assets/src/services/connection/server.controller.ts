import { Channel } from 'phoenix';
import { Observable, Subject } from 'rxjs';

export abstract class ServerController {
  protected constructor(readonly channel: Channel) {}

  push(event: string, paylod: object) {
    return new Promise((resolve, reject) => {
      this.channel.push(event, paylod).receive('ok', resolve).receive('error', reject);
    });
  }

  onMessage(event: string) {
    return new Observable((subscriber) => {
      const id = this.channel.on(event, (response) => subscriber.next(response));
      return () => {
        this.channel.off(event, id);
      };
    });
  }
}
