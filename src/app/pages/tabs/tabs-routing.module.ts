import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'scan-devices',
        loadChildren: () => import('../scan-devices/scan-devices.module').then( m => m.ScanDevicesPageModule)
      },
      {
        path: 'broadcast-device',
        loadChildren: () => import('../broadcast-device/broadcast-device.module').then( m => m.BroadcastDevicePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/scan-devices',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/scan-devices',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
