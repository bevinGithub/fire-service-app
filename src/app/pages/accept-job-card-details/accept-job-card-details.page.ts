import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';

@Component({
  selector: 'app-accept-job-card-details',
  templateUrl: './accept-job-card-details.page.html',
  styleUrls: ['./accept-job-card-details.page.scss'],
})
export class AcceptJobCardDetailsPage implements OnInit {
  jobID: any;
  job: any;
  staff: any;
  minDate: any;
  jobCard: any = {};
  url = environment.url;
  networkStatus: any;
  database: SQLiteObject;

  moduleID: any;
  currentDateTime: any;
  techAccept: any;
  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.minDate = moment(new Date()).format('YYYY-MM-DD');
    this.currentDateTime = moment(new Date()).format('YYYY-MM-DD HH:mm');
    console.log(this.minDate);
    this.jobID = this.activatedRoute.snapshot.paramMap.get('jobID');
    console.log(this.jobID);
    this.http.get(this.url + 'sp-get-accept-job-details.php?jobID=' + this.jobID).subscribe((data: any) => {
      console.log(data);
      this.job = data?.job;
      this.staff = data?.staff;
      this.jobCard.id = this.job.id;
      this.jobCard.arrivalTime = this.currentDateTime;
      this.moduleID = this.job.module_id;
      // this.tech_status =
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.getOfflineJobCard();
    }
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.getOfflineJobCard();
    }
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
          console.log('Data: ');
          console.log(res.rows.item(0));
          this.job = res.rows.item(0);
        }
      });

      // eslint-disable-next-line max-len
      const queryClient = 'SELECT * FROM fire_sp_users WHERE fire_users.user_id=?';
      this.database.executeSql(queryClient, [this.job.client_id]).then((client: any) => {
        if (client.rows.length > 0) {
          console.log('Clients: ');
          console.log(client.rows.item(0));
          this.staff = client.rows.item(0);
        }
      });
    }).catch(err => {
      // console.log('Table fire_fault_reports could not be created' + JSON.stringify(err));
    });
  }


  async acceptJob() {
    const alert = await this.alertController.create({
      header: ' Job Card Confirmation',
      message: 'Are you sure you want to accept job card with selected date and time?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.submitAcceptJob(this.jobCard);
          }
        }
      ]
    });

    await alert.present();
  }

  async submitAcceptJob(values) {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    loading.present();
    console.log(values);
    this.storage.get('currentUser').then((user: any) => {
      const postData = {
        techID: user.id, jobID: values.id, estimatedArrivalTime: values.arrivalTime
      };
      console.log(postData);
      this.http.post(this.url + 'sp-update-job-card-acceptance.php', postData).subscribe((data: any) => {
        console.log(data);
        loading.dismiss();
        if (data?.status === 'success') {
          this.systemNotification('Job card was accepted successfully!');
          this.router.navigate(['/technician-menu/technician-job-cards/' + this.moduleID]);
        } else {
          this.systemNotification('Job card could not be accepted successfully!');
        }
      }, err => {
        console.log(err);
        loading.dismiss();
      });
    });
  }

  async systemNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

}
