import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechAcceptedCardsSmokePage } from './tech-accepted-cards-smoke.page';

const routes: Routes = [
  {
    path: '',
    component: TechAcceptedCardsSmokePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechAcceptedCardsSmokePageRoutingModule {}
