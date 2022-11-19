import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-fault-reports',
  templateUrl: './client-fault-reports.page.html',
  styleUrls: ['./client-fault-reports.page.scss'],
})
export class ClientFaultReportsPage implements OnInit {
  staffID: any;
  faults: any;
  url = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((user: any) => {
          this.staffID = user.id;
          console.log(user);
          this.http.get(this.url + 'get-client-fault-requests-new.php?clientID=' + this.staffID).subscribe((data: any) => {
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
        this.http.get(this.url + 'get-client-fault-requests-new.php?clientID=' + this.staffID).subscribe((data: any) => {
          console.log(data);
          this.faults = data;
        });
      });
    });
  }

}
