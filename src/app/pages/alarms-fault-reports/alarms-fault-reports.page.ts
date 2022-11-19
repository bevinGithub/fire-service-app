import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-alarms-fault-reports',
  templateUrl: './alarms-fault-reports.page.html',
  styleUrls: ['./alarms-fault-reports.page.scss'],
})
export class AlarmsFaultReportsPage implements OnInit {
  staffID: any;
  faults: any;
  url = environment.url;
  total: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((user: any) => {
          this.staffID = user.id;
          console.log(user);
          this.http.get(this.url + 'get-client-fault-requests.php?staffID=' + this.staffID).subscribe((data: any) => {
            console.log(data);
            this.faults = data;
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
        console.log(user);
        this.getFaultRequests(this.staffID);
        this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
          console.log(res);
          this.total = res?.total;
        });
      });
    });
  }

  ionViewDidEnter(){
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.staffID = user.id;
        console.log(user);
        this.getFaultRequests(this.staffID);
        this.http.get(this.url + 'service-notifications.php?clientID=' + user?.client_id).subscribe((res: any) => {
          console.log(res);
          this.total = res?.total;
        });
      });
    });
  }

  getFaultRequests(staffID) {
    console.log('Reload');
    this.http.get(this.url + 'get-client-fault-requests.php?staffID=' + staffID).subscribe((data: any) => {
      console.log(data);
      this.faults = data;
    });
  }


}
