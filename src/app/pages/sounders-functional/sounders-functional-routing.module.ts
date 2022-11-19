import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoundersFunctionalPage } from './sounders-functional.page';

const routes: Routes = [
  {
    path: '',
    component: SoundersFunctionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoundersFunctionalPageRoutingModule {}
