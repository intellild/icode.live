import { Injectable } from '@angular/core';
import cookie from 'cookie';
import { GithubService } from './github.service';

const KEY = 'github_token';

const getToken = (): string | undefined => {
  const cookies = cookie.parse(document.cookie);
  return cookies.hasOwnProperty(KEY) ? cookies[KEY] : undefined;
};

export const token = getToken();

if (!token) {
  location.href = '/auth/github';
}

@Injectable()
export class UserService {
  private token: string | undefined = undefined;

  constructor(private readonly githubService: GithubService) {}

  getMe() {
    return this.githubService.getMe();
  }
}
