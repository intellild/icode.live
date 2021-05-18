import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nb-layout>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
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
