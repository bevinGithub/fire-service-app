import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllServiceCardsPage } from './all-service-cards.page';

const routes: Routes = [
  {
    path: '',
    component: AllServiceCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllServiceCardsPageRoutingModule {}
