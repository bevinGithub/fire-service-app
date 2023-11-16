import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fault-reports-list',
  templateUrl: './fault-reports-list.page.html',
  styleUrls: ['./fault-reports-list.page.scss'],
})
export class FaultReportsListPage implements OnInit {
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
          this.http.get(this.url + 'sp-get-client-fault-requests-3.php?staffID=' + this.staffID).subscribe((data: any) => {
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
