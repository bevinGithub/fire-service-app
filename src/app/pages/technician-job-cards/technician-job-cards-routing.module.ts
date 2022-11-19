import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianJobCardsPage } from './technician-job-cards.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianJobCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianJobCardsPageRoutingModule {}
