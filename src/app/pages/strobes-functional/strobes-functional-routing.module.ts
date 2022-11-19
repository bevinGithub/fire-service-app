import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StrobesFunctionalPage } from './strobes-functional.page';

const routes: Routes = [
  {
    path: '',
    component: StrobesFunctionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StrobesFunctionalPageRoutingModule {}
