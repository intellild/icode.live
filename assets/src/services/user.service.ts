import { Injectable } from '@angular/core';
import cookie from 'cookie';

const KEY = 'token';

const getToken = (): string | undefined => {
  const cookies = cookie.parse(document.cookie);
  return cookies.hasOwnProperty(KEY) ? cookies[KEY] : undefined;
};

@Injectable()
export class UserService {
  private token: string | undefined = undefined;

  public getToken(): string | undefined {
    if (!this.token) {
      this.token = getToken();
    }
    return this.token;
  }
}
