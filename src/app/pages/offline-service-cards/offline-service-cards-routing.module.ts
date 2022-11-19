import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfflineServiceCardsPage } from './offline-service-cards.page';

const routes: Routes = [
  {
    path: '',
    component: OfflineServiceCardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfflineServiceCardsPageRoutingModule {}
