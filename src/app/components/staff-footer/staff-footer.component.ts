import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-footer',
  templateUrl: './staff-footer.component.html',
  styleUrls: ['./staff-footer.component.scss'],
})
export class StaffFooterComponent implements OnInit {
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
