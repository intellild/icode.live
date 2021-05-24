import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gists_viewer_gists_nodes_files } from './__generated__/Gists';

@Injectable()
export class CodeService {
  fontSize$ = new BehaviorSubject(14);
  files: Gists_viewer_gists_nodes_files[] = [];
}
