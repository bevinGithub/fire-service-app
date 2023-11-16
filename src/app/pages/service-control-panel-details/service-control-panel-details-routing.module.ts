import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceControlPanelDetailsPage } from './service-control-panel-details.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceControlPanelDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceControlPanelDetailsPageRoutingModule {}
