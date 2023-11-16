import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaultsTechNotificationsPage } from './faults-tech-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: FaultsTechNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaultsTechNotificationsPageRoutingModule {}
