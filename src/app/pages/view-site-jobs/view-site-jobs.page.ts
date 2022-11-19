import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-site-jobs',
  templateUrl: './view-site-jobs.page.html',
  styleUrls: ['./view-site-jobs.page.scss'],
})
export class ViewSiteJobsPage implements OnInit {
  siteID: any;
  jobs: any;
  openJobs: any;
  completedJobs: any;
  url = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
    console.log(this.siteID);

      this.http.get(this.url + 'get-site-jobs-history-new.php?siteID=' + this.siteID).subscribe((data: any) => {
        console.log(data);
        this.jobs = data;
        this.openJobs = data?.open;
        this.completedJobs = data?.completed;
      });
   }

  ngOnInit() {
  }

}
