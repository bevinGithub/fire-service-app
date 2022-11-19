import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeamDetectionPage } from './beam-detection.page';

const routes: Routes = [
  {
    path: '',
    component: BeamDetectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeamDetectionPageRoutingModule {}
