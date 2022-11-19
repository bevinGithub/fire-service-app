import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FireAlarmsPage } from './fire-alarms.page';

const routes: Routes = [
  {
    path: '',
    component: FireAlarmsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FireAlarmsPageRoutingModule {}
