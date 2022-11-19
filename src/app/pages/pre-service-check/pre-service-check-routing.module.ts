import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PreServiceCheckPage } from './pre-service-check.page';

const routes: Routes = [
  {
    path: '',
    component: PreServiceCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreServiceCheckPageRoutingModule {}
