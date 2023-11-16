import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespondRequestPage } from './respond-request.page';

const routes: Routes = [
  {
    path: '',
    component: RespondRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespondRequestPageRoutingModule {}
