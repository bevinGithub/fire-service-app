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
        path: 'technician-job-cards/:moduleID',
        loadChildren: () => import('../technician-job-cards/technician-job-cards.module').then( m => m.TechnicianJobCardsPageModule)
      },
      {
        path: 'technician-service-cards/:moduleID',
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
        path: 'job-card-details/:jobID',
        loadChildren: () => import('../job-card-details/job-card-details.module').then( m => m.JobCardDetailsPageModule)
      },
      {
        path: 'service-card-details/:certificateID',
        loadChildren: () => import('../service-card-details/service-card-details.module').then( m => m.ServiceCardDetailsPageModule)
      },
      {
        path: 'offline-service-cards',
        loadChildren: () => import('../offline-service-cards/offline-service-cards.module').then( m => m.OfflineServiceCardsPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('../tabs/tabs.module').then( m => m.TabsPageModule)
      },
      {
        path: 'accept-job-card-details/:jobID',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../accept-job-card-details/accept-job-card-details.module').then( m => m.AcceptJobCardDetailsPageModule)
      },
      {
        path: 'accept-service-card-details-smoke/:serviceID',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../accept-service-card-details-smoke/accept-service-card-details-smoke.module').then( m => m.AcceptServiceCardDetailsSmokePageModule)
      },
      {
        path: 'service-card-details-smoke/:certificateID',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../service-card-details-smoke/service-card-details-smoke.module').then( m => m.ServiceCardDetailsSmokePageModule)
      },
      {
        path: 'view-service-card-details-smoke/:certificateID',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../view-service-card-details-smoke/view-service-card-details-smoke.module').then( m => m.ViewServiceCardDetailsSmokePageModule)
      },
      {
        path: 'respond-request/:spID',
        loadChildren: () => import('../respond-request/respond-request.module').then( m => m.RespondRequestPageModule)
      },
      {
        path: 'faults-smoke-notifiations',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../faults-smoke-notifiations/faults-smoke-notifiations.module').then( m => m.FaultsSmokeNotifiationsPageModule)
      },
      {
        path: 'faults-fire-notifiations',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../faults-fire-notifiations/faults-fire-notifiations.module').then( m => m.FaultsFireNotifiationsPageModule)
      },
      {
        path: 'faults-tech-notifications',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../faults-tech-notifications/faults-tech-notifications.module').then( m => m.FaultsTechNotificationsPageModule)
      },
      {
        path: 'all-job-cards',
        loadChildren: () => import('../all-job-cards/all-job-cards.module').then( m => m.AllJobCardsPageModule)
      },
      {
        path: 'all-service-cards',
        loadChildren: () => import('../all-service-cards/all-service-cards.module').then( m => m.AllServiceCardsPageModule)
      },
      {
        path: 'tech-accepted-jobs/:jobID',
        loadChildren: () => import('../tech-accepted-jobs/tech-accepted-jobs.module').then( m => m.TechAcceptedJobsPageModule)
      },
      {
        path: 'tech-accepted-cards/:serviceID',
        loadChildren: () => import('../tech-accepted-cards/tech-accepted-cards.module').then( m => m.TechAcceptedCardsPageModule)
      },
      {
        path: 'tech-accepted-cards-smoke/:serviceID',
        // eslint-disable-next-line max-len
        loadChildren: () => import('../tech-accepted-cards-smoke/tech-accepted-cards-smoke.module').then( m => m.TechAcceptedCardsSmokePageModule)
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
