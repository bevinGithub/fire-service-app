import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeExtractionPage } from './smoke-extraction.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeExtractionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeExtractionPageRoutingModule {}
