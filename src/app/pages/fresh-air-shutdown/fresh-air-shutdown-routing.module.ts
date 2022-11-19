import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreshAirShutdownPage } from './fresh-air-shutdown.page';

const routes: Routes = [
  {
    path: '',
    component: FreshAirShutdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreshAirShutdownPageRoutingModule {}
