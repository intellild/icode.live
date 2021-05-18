import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { GithubService } from '../services/github.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
})
export class IndexComponent implements AfterViewInit {
  private dialogRef: NbDialogRef<unknown> | null = null;
  @ViewChild('loginTemplate', { read: TemplateRef }) loginTemplateRef!: TemplateRef<unknown>;

  constructor(
    private readonly userService: UserService,
    private readonly dialogService: NbDialogService,
    private readonly githubService: GithubService,
  ) {}

  ngAfterViewInit() {
    this.githubService
      .getMe()
      .result()
      .then((value) => console.log(value.data));
  }
}
