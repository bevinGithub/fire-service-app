import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientMenuPage } from './client-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ClientMenuPage,
    children: [
      {
        path: 'client-dashboard',
        loadChildren: () => import('../client-dashboard/client-dashboard.module').then( m => m.ClientDashboardPageModule)
      },
      {
        path: 'client-sites',
        loadChildren: () => import('../client-sites/client-sites.module').then( m => m.ClientSitesPageModule)
      },
      {
        path: 'client-staff',
        loadChildren: () => import('../client-staff/client-staff.module').then( m => m.ClientStaffPageModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../user-profile/user-profile.module').then( m => m.UserProfilePageModule)
      },
      {
        path: 'contact-loggedin',
        loadChildren: () => import('../contact-loggedin/contact-loggedin.module').then( m => m.ContactLoggedinPageModule)
      },
      {
        path: 'alarms-fault-reports',
        loadChildren: () => import('../alarms-fault-reports/alarms-fault-reports.module').then( m => m.AlarmsFaultReportsPageModule)
      },
      {
        path: 'client-fault-reports',
        loadChildren: () => import('../client-fault-reports/client-fault-reports.module').then( m => m.ClientFaultReportsPageModule)
      },
      {
        path: 'all-client-faults',
        loadChildren: () => import('../all-client-faults/all-client-faults.module').then( m => m.AllClientFaultsPageModule)
      },
      {
        path: 'sites-history',
        loadChildren: () => import('../sites-history/sites-history.module').then( m => m.SitesHistoryPageModule)
      },
      {
        path: 'client-service-type/:siteID',
        loadChildren: () => import('../client-service-type/client-service-type.module').then( m => m.ClientServiceTypePageModule)
      },
      {
        path: 'client-profile',
        loadChildren: () => import('../client-profile/client-profile.module').then( m => m.ClientProfilePageModule)
      },
    ],
  },
  {
    path: 'menu',
    redirectTo: 'client-menu/client-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientMenuPageRoutingModule {}
