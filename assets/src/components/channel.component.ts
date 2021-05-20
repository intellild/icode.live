import { Component } from '@angular/core';
import * as monaco from 'monaco-editor';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
})
export class ChannelComponent {
  model$ = new BehaviorSubject<monaco.editor.ITextModel | null>(monaco.editor.createModel('', 'javascript'));
}
