import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RateTechnicianPage } from './rate-technician.page';

const routes: Routes = [
  {
    path: '',
    component: RateTechnicianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RateTechnicianPageRoutingModule {}
