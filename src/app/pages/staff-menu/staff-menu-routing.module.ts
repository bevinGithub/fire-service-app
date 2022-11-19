import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaffMenuPage } from './staff-menu.page';

const routes: Routes = [
  {
    path: '',
    component: StaffMenuPage,
    children: [
      {
        path: 'staff-dashboard',
        loadChildren: () => import('../staff-dashboard/staff-dashboard.module').then( m => m.StaffDashboardPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
      },
      {
        path: 'fire-alarms',
        loadChildren: () => import('../fire-alarms/fire-alarms.module').then( m => m.FireAlarmsPageModule)
      },
      {
        path: 'alarms-fault-reports',
        loadChildren: () => import('../alarms-fault-reports/alarms-fault-reports.module').then( m => m.AlarmsFaultReportsPageModule)
      },
      {
        path: 'alarms-services',
        loadChildren: () => import('../alarms-services/alarms-services.module').then( m => m.AlarmsServicesPageModule)
      },
      {
        path: 'fire-hydrants',
        loadChildren: () => import('../fire-hydrants/fire-hydrants.module').then( m => m.FireHydrantsPageModule)
      },
      {
        path: 'sprinklers',
        loadChildren: () => import('../sprinklers/sprinklers.module').then( m => m.SprinklersPageModule)
      },
      {
        path: 'fire-hoses',
        loadChildren: () => import('../fire-hoses/fire-hoses.module').then( m => m.FireHosesPageModule)
      },
      {
        path: 'fire-extinguishers',
        loadChildren: () => import('../fire-extinguishers/fire-extinguishers.module').then( m => m.FireExtinguishersPageModule)
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
        path: 'fault-reports-list',
        loadChildren: () => import('../fault-reports-list/fault-reports-list.module').then( m => m.FaultReportsListPageModule)
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
export class StaffMenuPageRoutingModule {}
