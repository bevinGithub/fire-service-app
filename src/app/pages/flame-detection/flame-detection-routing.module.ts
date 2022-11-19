import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlameDetectionPage } from './flame-detection.page';

const routes: Routes = [
  {
    path: '',
    component: FlameDetectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlameDetectionPageRoutingModule {}
