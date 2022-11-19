import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoubleKnockPage } from './double-knock.page';

const routes: Routes = [
  {
    path: '',
    component: DoubleKnockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoubleKnockPageRoutingModule {}
