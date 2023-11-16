import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeReadWriteVentPage } from './smoke-read-write-vent.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeReadWriteVentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeReadWriteVentPageRoutingModule {}
