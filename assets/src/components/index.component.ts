import { Component } from '@angular/core';
import { JoinChannelViewModel } from '../view-models/join-channel.view-model';
import { NewChannelViewModel } from '../view-models/new-channel.view-model';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
  styleUrls: ['./index.component.scss'],
  providers: [NewChannelViewModel, JoinChannelViewModel],
})
export class IndexComponent {
  constructor(readonly newChannelViewModel: NewChannelViewModel, readonly joinChannelViewModel: JoinChannelViewModel) {}
}
