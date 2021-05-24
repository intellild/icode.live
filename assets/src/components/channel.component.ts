import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as monaco from 'monaco-editor';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Gist_viewer_gist, Gist_viewer_gist_files } from '../services/__generated__/Gist';
import { CodeService } from '../services/code.service';
import { GithubService } from '../services/github.service';
import { notNull } from '../utils/not-null';

class File {
  private model: import('monaco-editor').editor.ITextModel | null = null;

  constructor(
    readonly name: string,
    readonly text: string,
    readonly language: string | undefined | null,
    readonly color: string | undefined | null,
  ) {}

  async getModel() {
    if (!this.model) {
      const monaco = await import('monaco-editor');
      this.model = monaco.editor.createModel(this.text, this.language ?? undefined);
    }
    return this.model;
  }
}

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements AfterViewInit, OnDestroy {
  readonly $$: Subscription[] = [];
  model$ = new BehaviorSubject<monaco.editor.ITextModel | null>(null);
  tabIndex$ = new BehaviorSubject(0);
  gist: Gist_viewer_gist | null = null;
  files: File[] = [];

  constructor(private readonly githubService: GithubService, private readonly activatedRoute: ActivatedRoute) {}

  ngAfterViewInit() {
    const $tabIndex = this.tabIndex$.subscribe((tabIndex) => {
      if (this.files.length > tabIndex) {
        const file = this.files[tabIndex];
        file.getModel().then((model) => this.model$.next(model));
      }
    });
    this.$$.push($tabIndex);
    const { owner } = this.activatedRoute.snapshot.params;
    if (!owner) {
      // @TODO error
      return;
    }
    this.githubService
      .getMe()
      .result()
      .then((me) => {
        if (me.data.viewer.login === owner) {
          this.fetchGist();
        }
      });
  }

  ngOnDestroy() {
    this.$$.forEach(($) => $.unsubscribe());
  }

  private fetchGist() {
    const gistName = this.activatedRoute.snapshot.queryParamMap.get('gist');
    if (!gistName) {
      // @TODO error
      return;
    }
    this.githubService
      .getGist(gistName)
      .toPromise()
      .then((gist) => {
        this.files =
          gist.data.viewer.gist?.files
            ?.filter(notNull)
            .map(
              (file) => new File(file.name ?? '', file.text ?? '', file.language?.name ?? '', file.language?.color),
            ) ?? [];
      });
  }
}
