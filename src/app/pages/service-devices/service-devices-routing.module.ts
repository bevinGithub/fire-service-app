import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceDevicesPage } from './service-devices.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceDevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceDevicesPageRoutingModule {}
