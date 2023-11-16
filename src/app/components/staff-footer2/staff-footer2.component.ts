import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-footer2',
  templateUrl: './staff-footer2.component.html',
  styleUrls: ['./staff-footer2.component.scss'],
})
export class StaffFooter2Component implements OnInit {
  url = environment.url;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {}

  home() {
    this.router.navigate(['/staff-menu/staff-dashboard']);
  }

  staffFaults() {
    this.router.navigate(['/staff-menu/staff-dashboard']);
    // /staff-menu/alarms-fault-reports
  }

  services() {
    this.router.navigate(['/staff-menu/staff-dashboard']);
    // /staff-menu/alarms-services
  }

  contactUs() {
    this.router.navigate(['/staff-menu/contact-loggedin']);
  }
  logOut() {
    this.storage.clear();
    console.log('User loggedout!');
    this.router.navigate(['/welcome']);
  }
}
