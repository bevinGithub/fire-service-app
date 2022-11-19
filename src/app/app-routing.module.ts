import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'client-registration',
    loadChildren: () => import('./pages/client-registration/client-registration.module').then( m => m.ClientRegistrationPageModule)
  },
  {
    path: 'client-login',
    loadChildren: () => import('./pages/client-login/client-login.module').then( m => m.ClientLoginPageModule)
  },
  {
    path: 'technician-login',
    loadChildren: () => import('./pages/technician-login/technician-login.module').then( m => m.TechnicianLoginPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'entry/:action',
    loadChildren: () => import('./pages/entry/entry.module').then( m => m.EntryPageModule)
  },
  {
    path: 'technician-registration',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/technician-registration/technician-registration.module').then( m => m.TechnicianRegistrationPageModule)
  },
  {
    path: 'account-activation',
    loadChildren: () => import('./pages/account-activation/account-activation.module').then( m => m.AccountActivationPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'client-menu',
    loadChildren: () => import('./pages/client-menu/client-menu.module').then( m => m.ClientMenuPageModule)
  },
  {
    path: 'add-staff',
    loadChildren: () => import('./pages/add-staff/add-staff.module').then( m => m.AddStaffPageModule)
  },
  {
    path: 'request-site',
    loadChildren: () => import('./pages/request-site/request-site.module').then( m => m.RequestSitePageModule)
  },
  {
    path: 'reset-password/:userID',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'site-details/:siteID',
    loadChildren: () => import('./pages/site-details/site-details.module').then( m => m.SiteDetailsPageModule)
  },
  {
    path: 'email-confirmation',
    loadChildren: () => import('./pages/email-confirmation/email-confirmation.module').then( m => m.EmailConfirmationPageModule)
  },
  {
    path: 'edit-site/:siteID',
    loadChildren: () => import('./pages/edit-site/edit-site.module').then( m => m.EditSitePageModule)
  },
  {
    path: 'staff-details/:staffID',
    loadChildren: () => import('./pages/staff-details/staff-details.module').then( m => m.StaffDetailsPageModule)
  },
  {
    path: 'edit-staff/:staffID',
    loadChildren: () => import('./pages/edit-staff/edit-staff.module').then( m => m.EditStaffPageModule)
  },
  {
    path: 'staff-registration',
    loadChildren: () => import('./pages/staff-registration/staff-registration.module').then( m => m.StaffRegistrationPageModule)
  },
  {
    path: 'staff-entry/:action',
    loadChildren: () => import('./pages/staff-entry/staff-entry.module').then( m => m.StaffEntryPageModule)
  },
  {
    path: 'staff-activation',
    loadChildren: () => import('./pages/staff-activation/staff-activation.module').then( m => m.StaffActivationPageModule)
  },
  {
    path: 'staff-menu',
    loadChildren: () => import('./pages/staff-menu/staff-menu.module').then( m => m.StaffMenuPageModule)
  },
  {
    path: 'staff-dashboard',
    loadChildren: () => import('./pages/staff-dashboard/staff-dashboard.module').then( m => m.StaffDashboardPageModule)
  },
  {
    path: 'fault-report/:siteID',
    loadChildren: () => import('./pages/fault-report/fault-report.module').then( m => m.FaultReportPageModule)
  },
  {
    path: 'fault-reports',
    loadChildren: () => import('./pages/fault-reports/fault-reports.module').then( m => m.FaultReportsPageModule)
  },
  {
    path: 'alarms-fault-reports',
    loadChildren: () => import('./pages/alarms-fault-reports/alarms-fault-reports.module').then( m => m.AlarmsFaultReportsPageModule)
  },
  {
    path: 'alarms-services',
    loadChildren: () => import('./pages/alarms-services/alarms-services.module').then( m => m.AlarmsServicesPageModule)
  },
  {
    path: 'add-fault-report',
    loadChildren: () => import('./pages/add-fault-report/add-fault-report.module').then( m => m.AddFaultReportPageModule)
  },
  {
    path: 'view-fault-report/:faultID',
    loadChildren: () => import('./pages/view-fault-report/view-fault-report.module').then( m => m.ViewFaultReportPageModule)
  },
  {
    path: 'edit-profile/:userID',
    loadChildren: () => import('./pages/edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'add-service',
    loadChildren: () => import('./pages/add-service/add-service.module').then( m => m.AddServicePageModule)
  },
  {
    path: 'service-request/:siteID',
    loadChildren: () => import('./pages/service-request/service-request.module').then( m => m.ServiceRequestPageModule)
  },
  {
    path: 'service-date',
    loadChildren: () => import('./modals/service-date/service-date.module').then( m => m.ServiceDatePageModule)
  },
  {
    path: 'view-service-request/:certificateID',
    loadChildren: () => import('./pages/view-service-request/view-service-request.module').then( m => m.ViewServiceRequestPageModule)
  },
  {
    path: 'service-notification/:serviceID',
    loadChildren: () => import('./pages/service-notification/service-notification.module').then( m => m.ServiceNotificationPageModule)
  },
  {
    path: 'tech-entry/:action',
    loadChildren: () => import('./pages/tech-entry/tech-entry.module').then( m => m.TechEntryPageModule)
  },
  {
    path: 'technician-activation',
    loadChildren: () => import('./pages/technician-activation/technician-activation.module').then( m => m.TechnicianActivationPageModule)
  },
  {
    path: 'technician-menu',
    loadChildren: () => import('./pages/technician-menu/technician-menu.module').then( m => m.TechnicianMenuPageModule)
  },
  {
    path: 'job-card-details/:jobID',
    loadChildren: () => import('./pages/job-card-details/job-card-details.module').then( m => m.JobCardDetailsPageModule)
  },
  {
    path: 'accept-job-card-details/:jobID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/accept-job-card-details/accept-job-card-details.module').then( m => m.AcceptJobCardDetailsPageModule)
  },
  {
    path: 'other-signature',
    loadChildren: () => import('./modals/other-signature/other-signature.module').then( m => m.OtherSignaturePageModule)
  },
  {
    path: 'clients-signature',
    loadChildren: () => import('./modals/clients-signature/clients-signature.module').then( m => m.ClientsSignaturePageModule)
  },
  {
    path: 'view-job-card-details/:jobID',
    loadChildren: () => import('./pages/view-job-card-details/view-job-card-details.module').then( m => m.ViewJobCardDetailsPageModule)
  },
  {
    path: 'rate-technician/:jobID',
    loadChildren: () => import('./pages/rate-technician/rate-technician.module').then( m => m.RateTechnicianPageModule)
  },
  {
    path: 'reviews/:technicianID',
    loadChildren: () => import('./pages/reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'service-card-details/:certificateID',
    loadChildren: () => import('./pages/service-card-details/service-card-details.module').then( m => m.ServiceCardDetailsPageModule)
  },
  {
    path: 'service-client-signature',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./modals/service-client-signature/service-client-signature.module').then( m => m.ServiceClientSignaturePageModule)
  },
  {
    path: 'company-rep-signature',
    loadChildren: () => import('./modals/company-rep-signature/company-rep-signature.module').then( m => m.CompanyRepSignaturePageModule)
  },
  {
    path: 'view-service-card-details/:certificateID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/view-service-card-details/view-service-card-details.module').then( m => m.ViewServiceCardDetailsPageModule)
  },
  {
    path: 'staff-sites',
    loadChildren: () => import('./pages/staff-sites/staff-sites.module').then( m => m.StaffSitesPageModule)
  },
  {
    path: 'complete-fault-report/:jobID',
    loadChildren: () => import('./pages/complete-fault-report/complete-fault-report.module').then( m => m.CompleteFaultReportPageModule)
  },
  {
    path: 'complete-service-history/:certificateID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/complete-service-history/complete-service-history.module').then( m => m.CompleteServiceHistoryPageModule)
  },
  {
    path: 'client-fault-report',
    loadChildren: () => import('./pages/client-fault-report/client-fault-report.module').then( m => m.ClientFaultReportPageModule)
  },
  {
    path: 'view-client-fault/:faultID',
    loadChildren: () => import('./pages/view-client-fault/view-client-fault.module').then( m => m.ViewClientFaultPageModule)
  },
  {
    path: 'test-camera',
    loadChildren: () => import('./pages/test-camera/test-camera.module').then( m => m.TestCameraPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'all-client-faults-details/:faultID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/all-client-faults-details/all-client-faults-details.module').then( m => m.AllClientFaultsDetailsPageModule)
  },
  {
    path: 'audios',
    loadChildren: () => import('./modals/audios/audios.module').then( m => m.AudiosPageModule)
  },
  {
    path: 'view-site-jobs/:siteID',
    loadChildren: () => import('./pages/view-site-jobs/view-site-jobs.module').then( m => m.ViewSiteJobsPageModule)
  },
  {
    path: 'view-site-certificates/:siteID',
    loadChildren: () => import('./pages/view-site-certificates/view-site-certificates.module').then( m => m.ViewSiteCertificatesPageModule)
  },
  {
    path: 'view-site-fault-details/:faultID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/view-site-fault-details/view-site-fault-details.module').then( m => m.ViewSiteFaultDetailsPageModule)
  },
  {
    path: 'view-site-faults-complete/:jobID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/view-site-faults-complete/view-site-faults-complete.module').then( m => m.ViewSiteFaultsCompletePageModule)
  },
  {
    path: 'view-site-certificate-complete/:certificateID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/view-site-certificate-complete/view-site-certificate-complete.module').then( m => m.ViewSiteCertificateCompletePageModule)
  },
  {
    path: 'view-site-certificate-details/:certificateID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/view-site-certificate-details/view-site-certificate-details.module').then( m => m.ViewSiteCertificateDetailsPageModule)
  },
  {
    path: 'tag-writing',
    loadChildren: () => import('./pages/tag-writing/tag-writing.module').then( m => m.TagWritingPageModule)
  },
  {
    path: 'tag-reading',
    loadChildren: () => import('./pages/tag-reading/tag-reading.module').then( m => m.TagReadingPageModule)
  },
  {
    path: 'tags-data',
    loadChildren: () => import('./modals/tags-data/tags-data.module').then( m => m.TagsDataPageModule)
  },
  {
    path: 'readwrite/:state',
    loadChildren: () => import('./pages/readwrite/readwrite.module').then( m => m.ReadwritePageModule)
  },
  {
    path: 'pad',
    loadChildren: () => import('./pages/pad/pad.module').then( m => m.PadPageModule)
  },
  {
    path: 'view-rejected-service-certificate/:certificateID',
    // eslint-disable-next-line max-len
    loadChildren: () => import('./pages/view-rejected-service-certificate/view-rejected-service-certificate.module').then( m => m.ViewRejectedServiceCertificatePageModule)
  },
  {
    path: 'sync',
    loadChildren: () => import('./pages/sync/sync.module').then( m => m.SyncPageModule)
  },
  {
    path: 'service-summary/:certificateID',
    loadChildren: () => import('./pages/service-summary/service-summary.module').then( m => m.ServiceSummaryPageModule)
  },
  {
    path: 'log-book/:certID',
    loadChildren: () => import('./pages/log-book/log-book.module').then( m => m.LogBookPageModule)
  },
  {
    path: 'call-points/:certID',
    loadChildren: () => import('./pages/call-points/call-points.module').then( m => m.CallPointsPageModule)
  },
  {
    path: 'building-structures/:certID',
    loadChildren: () => import('./pages/building-structures/building-structures.module').then( m => m.BuildingStructuresPageModule)
  },
  {
    path: 'beam-detection/:certID',
    loadChildren: () => import('./pages/beam-detection/beam-detection.module').then( m => m.BeamDetectionPageModule)
  },
  {
    path: 'air-sampling/:certID',
    loadChildren: () => import('./pages/air-sampling/air-sampling.module').then( m => m.AirSamplingPageModule)
  },
  {
    path: 'liner-heat/:certID',
    loadChildren: () => import('./pages/liner-heat/liner-heat.module').then( m => m.LinerHeatPageModule)
  },
  {
    path: 'flame-detection/:certID',
    loadChildren: () => import('./pages/flame-detection/flame-detection.module').then( m => m.FlameDetectionPageModule)
  },
  {
    path: 'wire-less/:serviceTypeID/:siteID',
    loadChildren: () => import('./pages/wire-less/wire-less.module').then( m => m.WireLessPageModule)
  },
  {
    path: 'monitoring/:certID',
    loadChildren: () => import('./pages/monitoring/monitoring.module').then( m => m.MonitoringPageModule)
  },
  {
    path: 'stair-pressure/:certID',
    loadChildren: () => import('./pages/stair-pressure/stair-pressure.module').then( m => m.StairPressurePageModule)
  },
  {
    path: 'lift-pressure/:certID',
    loadChildren: () => import('./pages/lift-pressure/lift-pressure.module').then( m => m.LiftPressurePageModule)
  },
  {
    path: 'smoke-extraction/:certID',
    loadChildren: () => import('./pages/smoke-extraction/smoke-extraction.module').then( m => m.SmokeExtractionPageModule)
  },
  {
    path: 'smoke-ventilation/:certID',
    loadChildren: () => import('./pages/smoke-ventilation/smoke-ventilation.module').then( m => m.SmokeVentilationPageModule)
  },
  {
    path: 'roller-shutter/:certID',
    loadChildren: () => import('./pages/roller-shutter/roller-shutter.module').then( m => m.RollerShutterPageModule)
  },
  {
    path: 'door-holds/:certID',
    loadChildren: () => import('./pages/door-holds/door-holds.module').then( m => m.DoorHoldsPageModule)
  },
  {
    path: 'escape-doors/:certID',
    loadChildren: () => import('./pages/escape-doors/escape-doors.module').then( m => m.EscapeDoorsPageModule)
  },
  {
    path: 'auto-evacuation/:certID',
    loadChildren: () => import('./pages/auto-evacuation/auto-evacuation.module').then( m => m.AutoEvacuationPageModule)
  },
  {
    path: 'remote-signal/:certID',
    loadChildren: () => import('./pages/remote-signal/remote-signal.module').then( m => m.RemoteSignalPageModule)
  },
  {
    path: 'gas-valves/:certID',
    loadChildren: () => import('./pages/gas-valves/gas-valves.module').then( m => m.GasValvesPageModule)
  },
  {
    path: 'cooker-head/:certID',
    loadChildren: () => import('./pages/cooker-head/cooker-head.module').then( m => m.CookerHeadPageModule)
  },
  {
    path: 'lift-homing/:certID',
    loadChildren: () => import('./pages/lift-homing/lift-homing.module').then( m => m.LiftHomingPageModule)
  },
  {
    path: 'ac-shutdown/:certID',
    loadChildren: () => import('./pages/ac-shutdown/ac-shutdown.module').then( m => m.AcShutdownPageModule)
  },
  {
    path: 'fresh-air-shutdown/:certID',
    loadChildren: () => import('./pages/fresh-air-shutdown/fresh-air-shutdown.module').then( m => m.FreshAirShutdownPageModule)
  },
  {
    path: 'other/:certID',
    loadChildren: () => import('./pages/other/other.module').then( m => m.OtherPageModule)
  },
  {
    path: 'single-knock/:certID',
    loadChildren: () => import('./pages/single-knock/single-knock.module').then( m => m.SingleKnockPageModule)
  },
  {
    path: 'double-knock/:certID',
    loadChildren: () => import('./pages/double-knock/double-knock.module').then( m => m.DoubleKnockPageModule)
  },
  {
    path: 'fire-bells/:certID',
    loadChildren: () => import('./pages/fire-bells/fire-bells.module').then( m => m.FireBellsPageModule)
  },
  {
    path: 'sounders-functional/:certID',
    loadChildren: () => import('./pages/sounders-functional/sounders-functional.module').then( m => m.SoundersFunctionalPageModule)
  },
  {
    path: 'strobes-functional/:certID',
    loadChildren: () => import('./pages/strobes-functional/strobes-functional.module').then( m => m.StrobesFunctionalPageModule)
  },
  {
    path: 'suppression-detonators/:certID',
    loadChildren: () => import('./pages/suppression-detonators/suppression-detonators.module').then( m => m.SuppressionDetonatorsPageModule)
  },
  {
    path: 'door-monitor/:certID',
    loadChildren: () => import('./pages/door-monitor/door-monitor.module').then( m => m.DoorMonitorPageModule)
  },
  {
    path: 'suppression-cylinder/:certID',
    loadChildren: () => import('./pages/suppression-cylinder/suppression-cylinder.module').then( m => m.SuppressionCylinderPageModule)
  },
  {
    path: 'auto-manual-switch/:certID',
    loadChildren: () => import('./pages/auto-manual-switch/auto-manual-switch.module').then( m => m.AutoManualSwitchPageModule)
  },
  {
    path: 'pre-service-check/:certID/:panelID',
    loadChildren: () => import('./pages/pre-service-check/pre-service-check.module').then( m => m.PreServiceCheckPageModule)
  },
  {
    path: 'cleaning-devices/:serviceTypeID/:siteID/:panelID',
    loadChildren: () => import('./pages/cleaning-devices/cleaning-devices.module').then( m => m.CleaningDevicesPageModule)
  },
  {
    path: 'test-device-knock/:serviceTypeID/:siteID/:panelID',
    loadChildren: () => import('./pages/test-device-knock/test-device-knock.module').then( m => m.TestDeviceKnockPageModule)
  },
  {
    path: 'test-double-knock/:serviceTypeID/:siteID/:panelID',
    loadChildren: () => import('./pages/test-double-knock/test-double-knock.module').then( m => m.TestDoubleKnockPageModule)
  },
  {
    path: 'edit-client-profile',
    loadChildren: () => import('./pages/edit-client-profile/edit-client-profile.module').then( m => m.EditClientProfilePageModule)
  },
  {
    path: 'client-profile',
    loadChildren: () => import('./pages/client-profile/client-profile.module').then( m => m.ClientProfilePageModule)
  },
  {
    path: 'write-master',
    loadChildren: () => import('./pages/write-master/write-master.module').then( m => m.WriteMasterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
