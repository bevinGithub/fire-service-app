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
  modules: any;
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
          this.http.post(this.url + 'sp-update-onesignal-data.php', posttData).subscribe((res: any) => {
            console.log(res);
          });
        });
      });
      this.getActiveModules(user?.id, user?.client_id);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    //Get Notifiation
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.getServiceNotifications(user?.client_id);
      this.getActiveModules(user?.id, user?.client_id);
    });
  }

  getServiceNotifications(clientID) {
    this.http.get(this.url + 'service-notifications.php?clientID=' + clientID).subscribe((res: any) => {
      console.log(res);
      this.total = res?.total;
    });
  }

  //GET ACTIVE MODULES
  getActiveModules(userID, clientID) {
    this.http.get(this.url + 'sp-get-staff-active-modules.php?userID=' + userID  + '&clientID=' + clientID).subscribe((mod: any) => {
      console.log(mod);
      this.modules = mod;
    });
  }
}
