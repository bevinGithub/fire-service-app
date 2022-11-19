import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-site-faults-complete',
  templateUrl: './view-site-faults-complete.page.html',
  styleUrls: ['./view-site-faults-complete.page.scss'],
})
export class ViewSiteFaultsCompletePage implements OnInit {
  job: any;
  tech: any;
  staff: any;
  jobID: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.http.get(this.url + 'get-completed-job-details.php?jobID=' + this.jobID).subscribe((data: any) => {
      console.log(data);
      this.job = data.job;
      this.staff = data.staff;
      this.tech = data.tech;
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.http.get(this.url + 'get-completed-job-details.php?jobID=' + this.jobID).subscribe((data: any) => {
      console.log(data);
      this.job = data.job;
      this.staff = data.staff;
      this.tech = data.tech;
    });
  }

}
