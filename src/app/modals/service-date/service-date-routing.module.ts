import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceDatePage } from './service-date.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceDatePageRoutingModule {}
