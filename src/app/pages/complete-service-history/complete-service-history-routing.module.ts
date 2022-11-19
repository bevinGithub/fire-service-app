import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteServiceHistoryPage } from './complete-service-history.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteServiceHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteServiceHistoryPageRoutingModule {}
