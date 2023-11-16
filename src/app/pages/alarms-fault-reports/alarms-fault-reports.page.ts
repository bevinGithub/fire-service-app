import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  moduleID: any;
  clientID: any;
  closedFaults: any;
  openFaults: any;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
      this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
      console.log('Module ID: ' + this.moduleID);
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((user: any) => {
          this.clientID = user.client_id;
          console.log(user);
          this.getFaultRequests(this.clientID, this.moduleID);
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
    this.moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
    console.log('Module ID: ' + this.moduleID);
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.clientID = user.client_id;
        console.log(user);
        this.getFaultRequests(this.clientID, this.moduleID);
      });
    });
  }

  getFaultRequests(clientID, modID) {
    console.log('Reload');
    this.http.get(this.url + 'sp-get-staff-fault-requests.php?clientID=' + clientID + '&moduleID=' + modID).subscribe((data: any) => {
      console.log(data);
      this.openFaults = data.openFaults;
      this.closedFaults = data.closedFaults;
    });
  }


}
