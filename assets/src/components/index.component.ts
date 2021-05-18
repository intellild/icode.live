import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { GithubService } from '../services/github.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: `./index.component.html`,
})
export class IndexComponent implements AfterViewInit {
  @ViewChild('loginTemplate', { read: TemplateRef }) loginTemplateRef!: TemplateRef<unknown>;

  constructor(private readonly userService: UserService, private readonly githubService: GithubService) {}

  ngAfterViewInit() {
    this.githubService
      .getMe()
      .result()
      .then((value) => console.log(value.data));
  }
}
