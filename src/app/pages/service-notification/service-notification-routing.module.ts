import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceNotificationPage } from './service-notification.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceNotificationPageRoutingModule {}
