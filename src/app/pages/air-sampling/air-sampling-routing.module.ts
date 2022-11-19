import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirSamplingPage } from './air-sampling.page';

const routes: Routes = [
  {
    path: '',
    component: AirSamplingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirSamplingPageRoutingModule {}
