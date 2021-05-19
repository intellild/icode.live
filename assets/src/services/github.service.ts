import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Gists, GistsVariables } from './__generated__/Gists';
import { Me } from './__generated__/Me';

@Injectable()
export class GithubService {
  constructor(private readonly apollo: Apollo) {}

  getMe() {
    return this.apollo.watchQuery<Me>({
      query: gql`
        query Me {
          viewer {
            id
            login
            name
            email
            url
          }
        }
      `,
    });
  }

  getGists() {
    return this.apollo.watchQuery<Gists, GistsVariables>({
      query: gql`
        query Gists($count: Int!, $cursor: String) {
          viewer {
            gists(first: $count, after: $cursor) {
              nodes {
                id
                name
                files {
                  encodedName
                  encoding
                  extension
                  name
                  size
                  text
                }
              }
              pageInfo {
                endCursor
                startCursor
              }
            }
          }
        }
      `,
      variables: {
        count: 10,
      },
    });
  }
}
