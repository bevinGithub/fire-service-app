import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BroadcastDevicePage } from './broadcast-device.page';

const routes: Routes = [
  {
    path: '',
    component: BroadcastDevicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BroadcastDevicePageRoutingModule {}
