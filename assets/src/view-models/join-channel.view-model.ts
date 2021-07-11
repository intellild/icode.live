import { Injectable } from '@angular/core';

@Injectable()
export class JoinChannelViewModel {
  input = '';

  onSubmit() {
    console.log(this.input);
  }
}
