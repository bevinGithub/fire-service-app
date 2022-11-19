import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestDeviceKnockPage } from './test-device-knock.page';

const routes: Routes = [
  {
    path: '',
    component: TestDeviceKnockPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestDeviceKnockPageRoutingModule {}
