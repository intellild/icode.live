import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Me_viewer } from './__generated__/Me';

@Injectable()
export class GithubService {
  constructor(private readonly apollo: Apollo) {}

  getMe() {
    return this.apollo.watchQuery<Me_viewer>({
      query: gql`
        query Me {
          viewer {
            login
            name
            email
            url
          }
        }
      `,
    });
  }
}
