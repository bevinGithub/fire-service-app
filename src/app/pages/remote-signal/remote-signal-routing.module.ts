import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemoteSignalPage } from './remote-signal.page';

const routes: Routes = [
  {
    path: '',
    component: RemoteSignalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemoteSignalPageRoutingModule {}
