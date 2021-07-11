import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NewChannelViewModel } from '../view-models/new-channel.view-model';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
  styleUrls: ['./index.component.scss'],
  providers: [NewChannelViewModel],
})
export class IndexComponent {
  constructor(readonly newChannelViewModel: NewChannelViewModel) {}
}
