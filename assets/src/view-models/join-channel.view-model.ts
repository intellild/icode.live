import { Injectable } from '@angular/core';
import { filter, take } from 'rxjs/operators';
import { ConnectionService } from '../services/connection.service';
import { UserControl, UserControlResponse } from '../services/connection/user.controller';
import { NavigationService } from '../services/navigation.service';

@Injectable()
export class JoinChannelViewModel {
  input = '';

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly navigationService: NavigationService,
  ) {}

  async onSubmit() {
    const channel = this.input;
    const serverConnection = await this.connectionService.ensureServerConnection();
    await serverConnection.userController.push(UserControl.Join, {
      channel,
    });
    await serverConnection.userController
      .onMessage(UserControlResponse.Admission)
      .pipe(
        filter((response) => (response as any).channel === channel),
        take(1),
      )
      .toPromise();
    await this.navigationService.guestChannel(channel);
  }
}
