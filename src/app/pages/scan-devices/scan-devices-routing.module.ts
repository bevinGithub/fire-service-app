import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanDevicesPage } from './scan-devices.page';

const routes: Routes = [
  {
    path: '',
    component: ScanDevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanDevicesPageRoutingModule {}
