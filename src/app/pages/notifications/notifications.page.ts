import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  serviceNotifications: any;
  clientID: any;
  url = environment.url;
  count: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        console.log(user?.id);
        this.clientID = user.client_id;
        // Get the notifications list
        this.http.get(this.url + 'get-client-notifications.php?clientID=' + this.clientID).subscribe((notifications: any) => {
          console.log(notifications);
          this.serviceNotifications = notifications.notification;
          this.count = notifications.total;
        });
      });
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user?.id);
      this.clientID = user.client_id;
      // Get the notifications list
      this.http.get(this.url + 'get-client-notifications.php?clientID=' + this.clientID).subscribe((notifications: any) => {
        console.log(notifications);
        this.serviceNotifications = notifications.notification;
        this.count = notifications.total;
      });
    });
  }
}
