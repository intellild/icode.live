import { AfterViewInit, Component } from '@angular/core';
import * as monaco from 'monaco-editor';
import { BehaviorSubject } from 'rxjs';
import { Gists_viewer_gists_nodes_files } from '../services/__generated__/Gists';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit {
  model$ = new BehaviorSubject<monaco.editor.ITextModel | null>(monaco.editor.createModel('', 'javascript'));

  index = 0;

  get files() {
    return this.codeService.files;
  }

  getFileName(file: Gists_viewer_gists_nodes_files) {
    return file.name ?? '';
  }

  constructor(private readonly codeService: CodeService) {}

  ngAfterViewInit() {
    if (this.codeService.files.length) {
    }
  }
}
