import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CleaningDevicesPage } from './cleaning-devices.page';

const routes: Routes = [
  {
    path: '',
    component: CleaningDevicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleaningDevicesPageRoutingModule {}
