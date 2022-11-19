import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-client-faults-details',
  templateUrl: './all-client-faults-details.page.html',
  styleUrls: ['./all-client-faults-details.page.scss'],
})
export class AllClientFaultsDetailsPage implements OnInit {
  job: any;
  tech: any;
  staff: any;
  faultID: any;
  url = environment.url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController
  ) {
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    console.log(this.faultID);
    this.http.get(this.url + 'get-completed-job-details.php?jobID=' + this.faultID).subscribe((data: any) => {
      console.log(data);
      this.job = data.job;
      this.staff = data.staff;
      this.tech = data.tech;
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.faultID = this.activatedRoute.snapshot.paramMap.get('faultID');
    console.log(this.faultID);
    this.http.get(this.url + 'get-completed-job-details.php?jobID=' + this.faultID).subscribe((data: any) => {
      console.log(data);
      this.job = data.job;
      this.staff = data.staff;
      this.tech = data.tech;
    });
  }

}
