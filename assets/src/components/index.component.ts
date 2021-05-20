import { AfterViewInit, Component, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QueryRef } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, pairs, Subscription } from 'rxjs';
import { distinctUntilChanged, map, pairwise, share } from 'rxjs/operators';
import {
  Gists,
  Gists_viewer_gists_nodes,
  Gists_viewer_gists_nodes_files,
  GistsVariables,
} from '../services/__generated__/Gists';
import { GithubService } from '../services/github.service';
import { ServerService } from '../services/server.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements AfterViewInit, OnDestroy {
  @ViewChild('loginTemplate', { read: TemplateRef }) loginTemplateRef!: TemplateRef<unknown>;

  readonly $$: Subscription[] = [];
  readonly query: QueryRef<Gists, GistsVariables>;
  readonly selectedId$ = new BehaviorSubject<string | null>(null);
  readonly list$: Observable<Gists_viewer_gists_nodes[]>;
  readonly selectedGist$ = new BehaviorSubject<Gists_viewer_gists_nodes | null | undefined>(null);
  readonly files$: Observable<Gists_viewer_gists_nodes_files[]>;
  readonly loading$: Observable<boolean>;

  constructor(
    private readonly userService: UserService,
    private readonly githubService: GithubService,
    private readonly router: Router,
    private readonly serverService: ServerService,
  ) {
    this.query = githubService.getGists();
    const value$ = this.query.valueChanges;
    this.list$ = value$.pipe(
      map((value) => (value.data.viewer.gists.nodes?.filter((item) => !!item) as Gists_viewer_gists_nodes[]) ?? []),
      share(),
    );
    const $list = this.list$.subscribe((list) => {
      if (this.selectedId$.getValue() !== null) {
        return;
      }
      const id = list[0]?.id;
      if (!id) {
        return;
      }
      this.selectedId$.next(id);
    });
    this.$$.push($list);
    const $selectedGist = combineLatest([this.list$.pipe(distinctUntilChanged()), this.selectedId$])
      .pipe(map(([list, selectedId]) => list.find((item) => item.id === selectedId)))
      .subscribe(this.selectedGist$);
    this.$$.push($selectedGist);
    this.files$ = this.selectedGist$.pipe(
      map((gist) => (gist?.files?.filter((file) => !!file) as Gists_viewer_gists_nodes_files[]) ?? []),
      share(),
    );
    this.loading$ = value$.pipe(map((value) => value.loading));
  }

  getGistName(gist: Gists_viewer_gists_nodes) {
    return gist.files?.[0]?.name ?? '[empty]';
  }

  fetchMore() {
    if (this.query.getLastResult().error) {
      return;
    }
    const cursor = this.query.getLastResult().data.viewer.gists.pageInfo.endCursor;
    this.query.fetchMore({
      variables: {
        cursor,
        count: 10,
      },
    });
  }

  open() {
    this.router.navigate(['/channel']);
  }

  fork() {
    const gist = this.selectedGist$.getValue();
    if (!gist) {
      return;
    }
    this.githubService.forkGist(gist).then(() => {
      this.router.navigate(['/channel']);
    });
  }

  ngAfterViewInit() {
    this.serverService.connect();
  }

  ngOnDestroy() {
    this.$$.forEach(($) => $.unsubscribe());
  }
}
