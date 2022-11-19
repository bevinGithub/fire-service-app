import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditClientProfilePage } from './edit-client-profile.page';

const routes: Routes = [
  {
    path: '',
    component: EditClientProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditClientProfilePageRoutingModule {}
