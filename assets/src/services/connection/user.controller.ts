import { Channel } from 'phoenix';
import { ServerController } from './server.controller';

export enum UserControl {
  Join = 'join',
}

export enum UserControlResponse {
  Admission = 'admission',
}

export class UserController extends ServerController {
  constructor(channel: Channel) {
    super(channel);
  }
}
