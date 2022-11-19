import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TechnicianMenuPage } from './technician-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TechnicianMenuPage,
    children: [
      {
        path: 'technician-dashboard',
        loadChildren: () => import('../technician-dashboard/technician-dashboard.module').then( m => m.TechnicianDashboardPageModule)
      },
      {
        path: 'technician-job-cards',
        loadChildren: () => import('../technician-job-cards/technician-job-cards.module').then( m => m.TechnicianJobCardsPageModule)
      },
      {
        path: 'technician-service-cards',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../technician-service-cards/technician-service-cards.module').then( m => m.TechnicianServiceCardsPageModule)
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
        path: 'accept-service-card-details/:serviceID',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../accept-service-card-details/accept-service-card-details.module').then( m => m.AcceptServiceCardDetailsPageModule)
      },
      {
        path: 'offline-service-cards',
        loadChildren: () => import('../offline-service-cards/offline-service-cards.module').then( m => m.OfflineServiceCardsPageModule)
      },
    ]
  },
  {
    path: 'menu',
    redirectTo: 'tech-menu/technician-dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechnicianMenuPageRoutingModule {}
