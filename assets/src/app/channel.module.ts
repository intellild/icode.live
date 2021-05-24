import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ChannelComponent } from '../components/channel.component';
import { EditorDirective } from '../components/editor.directive';

const routes: Routes = [
  {
    path: ':owner',
    component: ChannelComponent,
  },
];

@NgModule({
  declarations: [ChannelComponent, EditorDirective],
  imports: [CommonModule, RouterModule.forChild(routes), NzTabsModule],
  exports: [RouterModule],
})
export class ChannelModule {}
