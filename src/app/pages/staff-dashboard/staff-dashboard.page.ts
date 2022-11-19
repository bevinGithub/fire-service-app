import { Component, OnInit } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-staff-dashboard',
  templateUrl: './staff-dashboard.page.html',
  styleUrls: ['./staff-dashboard.page.scss'],
})
export class StaffDashboardPage implements OnInit {
  url = environment.url;
  config: any;
  total: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private platform: Platform
  ) {
    this.storage.get('currentUser').then((user: any) => {
      this.platform.ready().then(() => {
      OneSignal.getDeviceState((stateChanges: any) => {
        console.log('Device State: ' + JSON.stringify(stateChanges));
        const userID = user?.id;
        const playerID = stateChanges.userId;
        const posttData = {
          userId: userID,
          playerId: playerID
        };
        console.log(posttData);
        this.http.post(this.url + 'update-onesignal-data.php', posttData).subscribe((res: any) => {
          console.log(res);
        });
        //Get Notifiation
        this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
          console.log(res);
          this.total = res?.total;
        });
      });

    });

    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    //Get Notifiation
    this.storage.get('currentUser').then((user: any) => {
      this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
        console.log(res);
        this.total = res?.total;
      });
    });
  }

  ionViewDidEnter(){
      //Get Notifiation
      this.storage.get('currentUser').then((user: any) => {
      this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
        console.log(res);
        this.total = res?.total;
      });
    });
  }
}
