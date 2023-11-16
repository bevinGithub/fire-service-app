import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { LoadingController } from '@ionic/angular';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-job-card-details',
  templateUrl: './view-job-card-details.page.html',
  styleUrls: ['./view-job-card-details.page.scss'],
})
export class ViewJobCardDetailsPage implements OnInit {
  job: any;
  tech: any;
  staff: any;
  jobID: any;
  url = environment.url;
  database: SQLiteObject;
  networkStatus: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService
  ) {
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.getOnlineCompletedJobs(this.jobID);
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.getOfflineJobCard();
    }
  }

  getOnlineCompletedJobs(jobID) {
    this.http.get(this.url + 'sp-get-completed-job-details.php?jobID=' + jobID).subscribe((data: any) => {
      console.log(data);
      this.job = data.job;
      this.staff = data.staff;
      this.tech = data.tech;
    });
  }

  getOfflineJobCard() {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
      console.log(this.jobID);
      // eslint-disable-next-line max-len
      const query = 'SELECT * FROM fire_sp_fault_reports JOIN fire_sp_sites ON fire_sp_fault_reports.site_id = fire_sp_sites.site_id  WHERE fire_sp_fault_reports.fault_id=?';
      this.database.executeSql(query, [this.jobID]).then((res: any) => {
        if (res.rows.length > 0) {
          this.job = res.rows.item(0);
        }
      });

      // eslint-disable-next-line max-len
      const queryClient = 'SELECT * FROM fire_sp_users WHERE fire_users.user_id=?';
      this.database.executeSql(queryClient, [this.job.client_id]).then((client: any) => {
        if (client.rows.length > 0) {
          this.staff = client.rows.item(0);
        }
      });
    }).catch(err => {
      // console.log('Table fire_fault_reports could not be created' + JSON.stringify(err));
    });
  }

}
