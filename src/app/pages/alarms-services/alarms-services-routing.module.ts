import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlarmsServicesPage } from './alarms-services.page';

const routes: Routes = [
  {
    path: '',
    component: AlarmsServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmsServicesPageRoutingModule {}
