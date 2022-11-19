import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoEvacuationPage } from './auto-evacuation.page';

const routes: Routes = [
  {
    path: '',
    component: AutoEvacuationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoEvacuationPageRoutingModule {}
