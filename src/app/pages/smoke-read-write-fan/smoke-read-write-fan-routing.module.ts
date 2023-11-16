import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeReadWriteFanPage } from './smoke-read-write-fan.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeReadWriteFanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeReadWriteFanPageRoutingModule {}
