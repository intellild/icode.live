import { AfterViewInit, Component } from '@angular/core';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-root',
  template: ` <router-outlet></router-outlet> `,
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
export class AppComponent implements AfterViewInit {
  title = 'show-me-the-code';

  constructor(private readonly connectionService: ConnectionService) {}

  ngAfterViewInit() {
    this.connectionService.initialize();
  }
}
