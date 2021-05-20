import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelComponent } from '../components/channel.component';

const routes: Routes = [
  {
    path: '',
    component: ChannelComponent,
  },
];

@NgModule({
  declarations: [ChannelComponent],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChannelModule {}
