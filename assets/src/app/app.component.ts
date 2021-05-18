import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <router-outlet></router-outlet>
    </nb-layout>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100vw;
        height: 100vh;
      }
    `,
  ],
})
export class AppComponent {
  title = 'show-me-the-code';
}
