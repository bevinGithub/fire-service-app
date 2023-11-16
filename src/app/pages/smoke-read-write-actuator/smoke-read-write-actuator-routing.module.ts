import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmokeReadWriteActuatorPage } from './smoke-read-write-actuator.page';

const routes: Routes = [
  {
    path: '',
    component: SmokeReadWriteActuatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmokeReadWriteActuatorPageRoutingModule {}
