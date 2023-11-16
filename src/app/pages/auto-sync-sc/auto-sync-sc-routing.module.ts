import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoSyncSCPage } from './auto-sync-sc.page';

const routes: Routes = [
  {
    path: '',
    component: AutoSyncSCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoSyncSCPageRoutingModule {}
