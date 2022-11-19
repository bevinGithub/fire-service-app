import { environment } from './../../../environments/environment';
import { AlertController, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
})
export class SyncPage implements OnInit {
  database: SQLiteObject;
  jobCards: any;
  serviceCards: any;
  networkStatus: any;
  networkType: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Job Cards Connection Status: ' + this.networkStatus);
    console.log('Condition: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      console.log('We in here: ' + this.networkStatus);
    }
  }

  runsyncJobCards() {
    console.log('Syncing....');
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
     }).then((db: SQLiteObject) => {
      this.database = db;

      const offData = [];
      const query = 'SELECT * FROM fire_fault_reports WHERE isSynced=?';
      const isSynced = 'No';
      this.database.executeSql(query, [isSynced]).then((res: any) => {
        if (res.rows.length > 0) {
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let i=0; i < res.rows.length; i++) {
             const postSyncData = res.rows.item(i);
             console.log(postSyncData);
             this.http.post(this.url + 'sync-job-cards.php', postSyncData).subscribe((sync: any) => {
              console.log('results: ' + JSON.stringify(sync));
              // update local database
              const syncData = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_fault_reports SET isSynced=?  WHERE fault_id = ${postSyncData.fault_id}`, [syncData])
              .then((update: any) => {
                console.log('Updated: ' + JSON.stringify(update));
                this.synConfirmation();
              }, err => {
                console.log('Query Update error: ' + JSON.stringify(err));
              });
             });
          }
        } else {
          console.log('There is no job cards');
          this.syncNone();
        }
      }, err => {
        console.log('Query Select Error: ' + JSON.stringify(err));
      });
    }, err => {
      console.log('Database connection error: ' + JSON.stringify(err));
    });
  }

  async syncJobCards() {
    const alert = await this.alertController.create({
      header: 'Snyc Data',
      message: 'Are you sure you want to sync the job cards?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.networkStatus = this.networkCheckerService.connectionType();
            console.log('Job Cards Connection Status: ' + this.networkStatus);
            console.log('Condition: ' + this.networkStatus);
            if (this.networkStatus === 'none') {
              console.log('Cannot Sync you offline: ' + this.networkStatus);
            } else {
              this.runsyncJobCards();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  runsyncServiceCards() {
    console.log('Syncing....');
    return this.router.navigate(['/technician-menu/offline-service-cards']);
  }

  async synConfirmation() {
    const alert = await this.alertController.create({
      header: 'Sync Confirmation',
      message: 'Sync is complete!',
      buttons: ['OK']
    });
    await alert.present();
  }

  syncServiceCards() {
    this.runsyncServiceCards();
  }

  async syncNone() {
    const toast = await this.toastController.create({
      message: 'There is no data to sync!',
      duration: 3000
    });
    toast.present();
  }


}
