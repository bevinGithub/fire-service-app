import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffEntryPage } from './staff-entry.page';

const routes: Routes = [
  {
    path: '',
    component: StaffEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffEntryPageRoutingModule {}
