import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-compound',
  template: `
    <div class="title">{{ title }}</div>
    <div class="detail">{{ detail }}</div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .title {
        font-size: 16px;
        font-weight: bold;
      }

      .detail {
        font-size: 12px;
      }
    `,
  ],
})
export class CompoundComponent {
  @Input()
  title: string = '';

  @Input()
  detail: string = '';
}
