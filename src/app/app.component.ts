import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import OneSignal from 'onesignal-cordova-plugin';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userInfo: any;
  path: any;
  url = environment.url;
  constructor(
    private platform: Platform,
    private router: Router,
    private zone: NgZone,
    private navController: NavController,
    private storage: Storage,
    private alertController: AlertController,
    private http: HttpClient,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // CHECK IF USER IS LOGGED IN
      this.storage.get('currentUser').then((loggedIn: any) => {
        this.userInfo = loggedIn;
        console.log(loggedIn);
        if (this.userInfo == null) {
          this.router.navigate(['/welcome']);
        } else {
          console.log(this.userInfo);
          if (this.userInfo.role_id === '2') {
            this.router.navigate(['/landing']);
          }
          if (this.userInfo.role_id === '3') {
            this.router.navigate(['/landing']);
          }
          if (this.userInfo.role_id === '4') {
            this.router.navigate(['/landing']);
          }
        }
      });

      // Notification
      this.oneSignalInit();
    });
  }

  oneSignalInit() {
    OneSignal.setAppId('91db3683-a422-40a2-8edd-b0f19e0ae96f');
    OneSignal.setNotificationOpenedHandler((one: any) => {
        console.log('notificationOpenedCallback: ' + JSON.stringify(one));
    });
    OneSignal.promptForPushNotificationsWithUserResponse((accepted: any) => {
        console.log('User accepted notifications: ' + accepted);
    });
    OneSignal.setNotificationOpenedHandler((tapped: any) => {
      console.log(tapped.notification);
      const title = tapped.notification.title;
      const msg = tapped.notification.body;
      const task = tapped.notification.additionalData;

      this.openNotification(title, msg, task);
    });
  }

  async openNotification(title, msg, task) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Ok ',
          handler: () => {
            console.log('Confirm Okay');
            this.openPage(task);
          }
        }
      ]
    });
    await alert.present();
  }

  openPage(data) {
    console.log(data);
    if (data?.spID && data?.receiverID && data?.requestID) {
      console.log('Has 3 IDs');
      this.router.navigate([`/${data?.controller}/${data?.id}/${data?.requestNumber}/${data?.receiverID}/${data?.requestID}`]);
    } else if (data?.spID) {
      console.log('Has Record ID' + data?.spID);
      this.router.navigate([`/${data?.controller}/${data?.spID}`]);
    } else if (data?.moduleName) {
      this.router.navigate([`/${data?.controller}`]);
    } else {
      console.log('No Record ID');
      this.router.navigate(['/' + data?.controller]);
    }
  }

}
