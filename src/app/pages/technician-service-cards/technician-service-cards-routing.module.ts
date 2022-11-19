import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianServiceCardsPage } from './technician-service-cards.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianServiceCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianServiceCardsPageRoutingModule {}
