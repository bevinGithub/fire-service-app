import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-staff',
  templateUrl: './client-staff.page.html',
  styleUrls: ['./client-staff.page.scss'],
})
export class ClientStaffPage implements OnInit {
  staff: any;
  clientID: any;
  url = environment.url;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) {
    this.storage.get('currentUser').then((client: any) => {
      this.clientID = client.id;
      this.getStaff(this.clientID);
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((client: any) => {
      this.clientID = client.id;
      this.getStaff(this.clientID);
    });
  }

  getStaff(clientID) {
    console.log('Refreshed!');
    this.http.get(this.url + 'sp-get-client-staff.php?clientID=' + clientID).subscribe((staffRes: any) => {
      console.log(staffRes);
      this.staff = staffRes;
    });
  }

}
