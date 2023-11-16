import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechAcceptedCardsPage } from './tech-accepted-cards.page';

const routes: Routes = [
  {
    path: '',
    component: TechAcceptedCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechAcceptedCardsPageRoutingModule {}
