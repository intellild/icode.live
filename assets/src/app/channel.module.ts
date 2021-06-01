import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ChannelComponent } from '../components/channel.component';
import { EditorDirective } from '../components/editor.directive';

const routes: Routes = [
  {
    path: ':channel',
    component: ChannelComponent,
  },
];

@NgModule({
  declarations: [ChannelComponent, EditorDirective],
  imports: [CommonModule, RouterModule.forChild(routes), NzIconModule, NzSpinModule, NzTabsModule],
  exports: [RouterModule],
})
export class ChannelModule {}
