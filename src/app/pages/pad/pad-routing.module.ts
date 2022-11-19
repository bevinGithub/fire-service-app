import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PadPage } from './pad.page';

const routes: Routes = [
  {
    path: '',
    component: PadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PadPageRoutingModule {}
