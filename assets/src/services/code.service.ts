import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Gists_viewer_gists_nodes_files } from './__generated__/Gists';

class File {
  private model: import('monaco-editor').editor.ITextModel | null = null;

  constructor(
    readonly name: string,
    readonly text: string,
    readonly language: string | undefined | null,
    readonly color: string | undefined | null,
  ) {}

  async getModel() {
    if (!this.model) {
      const monaco = await import('monaco-editor');
      this.model = monaco.editor.createModel(this.text, this.language ?? undefined);
    }
    return this.model;
  }
}

@Injectable()
export class CodeService {
  fontSize$ = new BehaviorSubject(14);
  files: File[] = [];

  setFiles(files: Gists_viewer_gists_nodes_files[]) {
    this.files = files.map(
      (file) => new File(file.name ?? '', file.text ?? '', file.language?.name ?? '', file.language?.color),
    );
  }
}
