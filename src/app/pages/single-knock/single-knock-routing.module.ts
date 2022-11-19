import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleKnockPage } from './single-knock.page';

const routes: Routes = [
  {
    path: '',
    component: SingleKnockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleKnockPageRoutingModule {}
