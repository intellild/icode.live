import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Gists_viewer_gists_nodes, Gists_viewer_gists_nodes_files } from '../services/__generated__/Gists';
import { GithubService } from '../services/github.service';
import { UserService } from '../services/user.service';

const EMPTY_NAME = '[empty]';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements AfterViewInit {
  @ViewChild('loginTemplate', { read: TemplateRef }) loginTemplateRef!: TemplateRef<unknown>;

  list: Gists_viewer_gists_nodes[] = [];
  cursor: string | undefined = undefined;
  selectedId: string | undefined = undefined;

  get files(): Gists_viewer_gists_nodes_files[] {
    const gist = this.list.find((item) => item.id === this.selectedId);
    if (!gist?.files) {
      return [];
    }
    return gist.files.filter((item) => item !== null) as Gists_viewer_gists_nodes_files[];
  }

  constructor(private readonly userService: UserService, private readonly githubService: GithubService) {}

  getGistName(gist: Gists_viewer_gists_nodes) {
    return gist.files?.[0]?.name ?? '[empty]';
  }

  ngAfterViewInit() {
    this.githubService
      .getGists(this.cursor)
      .toPromise()
      .then((value) => {
        const { nodes, pageInfo } = value.data.viewer.gists;
        nodes?.forEach((item) => {
          if (item) {
            this.list.push(item);
          }
        });
        this.cursor = pageInfo.endCursor ?? undefined;
        this.selectedId = nodes?.[0]?.id;
      });
  }
}
