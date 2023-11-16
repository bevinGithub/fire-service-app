import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeWriteVentPage } from './smoke-write-vent.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeWriteVentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeWriteVentPageRoutingModule {}
