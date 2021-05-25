import { Injectable } from '@angular/core';
import type { Octokit } from '@octokit/rest';
import { Apollo, gql } from 'apollo-angular';
import cookie from 'cookie';
import { keyBy } from 'lodash-es';
import { notNull } from '../utils/not-null';
import { Gist, Gist_viewer_gist, GistVariables } from './__generated__/Gist';
import { Gists, Gists_viewer_gists_nodes, Gists_viewer_gists_nodes_files, GistsVariables } from './__generated__/Gists';
import { Me } from './__generated__/Me';

const KEY = 'github_token';

const getToken = (): string | undefined => {
  const cookies = cookie.parse(document.cookie);
  return cookies.hasOwnProperty(KEY) ? cookies[KEY] : undefined;
};

export const token = getToken();

if (!token) {
  location.href = '/auth/github';
}

const GIST_FIELDS = gql`
  fragment gistFields on Gist {
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
`;

@Injectable()
export class GithubService {
  private octokit: Octokit | null = null;

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
        ${GIST_FIELDS}
        query Gists($count: Int!, $cursor: String) {
          viewer {
            id
            gists(first: $count, after: $cursor, privacy: ALL) {
              nodes {
                ...gistFields
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
    const files = gist.files?.filter(notNull).map((file) => ({
      filename: file.name,
      language: file.language?.name,
      content: file.text,
      encoding: file.encoding,
    }));
    return this.getOctokit().then((octokit) =>
      octokit.gists.create({
        description: '',
        files: files ? (keyBy(files, (file) => file.filename) as Record<string, any>) : {},
      }),
    );
  }

  getGist(name: string, id: string | undefined | null): Promise<Gist_viewer_gist | null> {
    if (id) {
      const cache = this.apollo.client.readFragment<Gist_viewer_gist>({
        id: `Gist:${id}`,
        fragment: GIST_FIELDS,
      });
      if (cache) {
        return Promise.resolve(cache);
      }
    }
    return this.apollo
      .query<Gist, GistVariables>({
        query: gql`
          ${GIST_FIELDS}
          query Gist($name: String!) {
            viewer {
              id
              gist(name: $name) {
                ...gistFields
              }
            }
          }
        `,
        variables: {
          name,
        },
      })
      .toPromise()
      .then((query) => query.data.viewer.gist);
  }

  private getOctokit() {
    if (this.octokit) {
      return Promise.resolve(this.octokit);
    }
    return import('@octokit/rest').then(({ Octokit }) => {
      this.octokit = new Octokit({
        auth: token,
      });
      return this.octokit;
    });
  }
}
