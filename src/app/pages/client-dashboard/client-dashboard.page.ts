import { Component, OnInit } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.page.html',
  styleUrls: ['./client-dashboard.page.scss'],
})
export class ClientDashboardPage implements OnInit {
  url = environment.url;
  config: any;
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
      //GET MODULES
      this.getActiveModules(user.id);
    });
    console.log(this.url);
   }

  ngOnInit() {
  }

  getActiveModules(techID) {
    this.http.get(this.url + 'sp-get-active-modules.php?techID=' + techID).subscribe((mod: any) => {
      console.log(mod);
      this.modules = mod;
    });
  }

}
