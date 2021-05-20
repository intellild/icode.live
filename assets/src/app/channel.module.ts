import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from '../components/channel.component';
import { EditorDirective } from '../components/editor.directive';

const routes: Routes = [
  {
    path: '',
    component: ChannelComponent,
  },
];

@NgModule({
  declarations: [ChannelComponent, EditorDirective],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelModule {}
