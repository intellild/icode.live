import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';
import { Apollo, gql } from 'apollo-angular';
import { keyBy } from 'lodash-es';
import { Gists, Gists_viewer_gists_nodes, Gists_viewer_gists_nodes_files, GistsVariables } from './__generated__/Gists';
import { Me } from './__generated__/Me';
import { token } from './user.service';

@Injectable()
export class GithubService {
  private readonly octokit = new Octokit({
    auth: token,
  });

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
                url
                description
                files {
                  encodedName
                  encoding
                  extension
                  name
                  size
                  text
                  language {
                    color
                    name
                  }
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

  forkGist(gist: Gists_viewer_gists_nodes) {
    const files = (gist.files?.filter((file) => !!file) as Gists_viewer_gists_nodes_files[]).map((file) => ({
      filename: file.name,
      language: file.language?.name,
      content: file.text,
      encoding: file.encoding,
    }));
    return this.octokit.gists.create({
      description: '',
      files: files ? (keyBy(files, (file) => file.filename) as Record<string, any>) : {},
    });
  }
}
