import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-complete-fault-report',
  templateUrl: './complete-fault-report.page.html',
  styleUrls: ['./complete-fault-report.page.scss'],
})
export class CompleteFaultReportPage implements OnInit {
  job: any;
  tech: any;
  staff: any;
  jobID: any;
  roleID: any;
  url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.getClientCompletedFaultDetails(this.jobID);
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('currentUser').then((user: any) => {
      this.roleID = user?.role_id;
      console.log(this.roleID);
    });
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.getClientCompletedFaultDetails(this.jobID);
  }

  getClientCompletedFaultDetails(faultID) {
    this.http.get(this.url + 'sp-get-completed-job-details.php?jobID=' + faultID).subscribe((data: any) => {
      console.log(data);
      this.job = data.job;
      this.staff = data.staff;
      this.tech = data.tech;
    });
  }

}
