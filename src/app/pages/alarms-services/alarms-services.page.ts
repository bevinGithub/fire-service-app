import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarms-services',
  templateUrl: './alarms-services.page.html',
  styleUrls: ['./alarms-services.page.scss'],
})
export class AlarmsServicesPage implements OnInit {
  staffID: any;
  clientID: any;
  services: any;
  total: any;
  url = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((user: any) => {
          this.staffID = user.id;
          this.clientID = user.client_id;
          console.log(user);
          this.http.get(this.url + 'get-client-service-requests.php?staffID=' + this.staffID + '&clientID=' + this.clientID)
          .subscribe((data: any) => {
            console.log(data);
            this.services = data;
          });
          this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
            console.log(res);
            this.total = res?.total;
          });
        });
      });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.staffID = user.id;
        this.clientID = user.client_id;
        console.log(user);
        this.http.get(this.url + 'get-client-service-requests.php?staffID=' + this.staffID + '&clientID=' + this.clientID)
        .subscribe((data: any) => {
          console.log(data);
          this.services = data;
        });
        this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
          console.log(res);
          this.total = res?.total;
        });
      });
    });
  }
}
