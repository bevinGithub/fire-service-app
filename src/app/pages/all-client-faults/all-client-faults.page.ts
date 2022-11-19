import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all-client-faults',
  templateUrl: './all-client-faults.page.html',
  styleUrls: ['./all-client-faults.page.scss'],
})
export class AllClientFaultsPage implements OnInit {
  clientID: any;
  faults: any;
  faultsAccepted: any;
  faultsCompleted: any;
  url = environment.url;
  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
  ) {
      this.storage.ready().then(() => {
        this.storage.get('currentUser').then((user: any) => {
          this.clientID = user.id;
          this.http.get(this.url + 'get-all-fault-requests.php?clientID=' + this.clientID).subscribe((data: any) => {
            console.log(data);
            this.faults = data.inprogress;
            this.faultsAccepted = data.accepted;
            this.faultsCompleted = data.completed;
          });
        });
      });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getAllFaults();
  }

  ionViewDidEnter(){
    this.getAllFaults();
  }

  getAllFaults() {
    this.storage.ready().then(() => {
      this.storage.get('currentUser').then((user: any) => {
        this.clientID = user.id;
        this.http.get(this.url + 'get-all-fault-requests.php?clientID=' + this.clientID).subscribe((data: any) => {
          this.faults = data.inprogress;
          this.faultsAccepted = data.accepted;
          this.faultsCompleted = data.completed;
        });
      });
    });
  }
}
