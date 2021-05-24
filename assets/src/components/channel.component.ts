import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import * as monaco from 'monaco-editor';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CodeService } from '../services/code.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit, OnDestroy {
  readonly $$: Subscription[] = [];
  model$ = new BehaviorSubject<monaco.editor.ITextModel | null>(null);
  tabIndex$ = new BehaviorSubject(0);

  get files() {
    return this.codeService.files;
  }

  constructor(private readonly codeService: CodeService) {}

  ngAfterViewInit() {
    const $tabIndex = this.tabIndex$.subscribe((tabIndex) => {
      if (this.files.length > tabIndex) {
        const file = this.files[tabIndex];
        file.getModel().then((model) => this.model$.next(model));
      }
    });
    this.$$.push($tabIndex);
  }

  ngOnDestroy() {
    this.$$.forEach(($) => $.unsubscribe());
  }
}
