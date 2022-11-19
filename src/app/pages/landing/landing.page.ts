import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  roleID: any;
  userInfo: any;
  radius: any;
  subscription: any;
  url = environment.url;
  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
  ) {
    console.log(this.url);
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.roleID = user.role_id;
      this.userInfo = user;

    });

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    const dateL = moment().format('YYYY-MM-D H:mm:ss');
    console.log(dateL);;
  }
}
