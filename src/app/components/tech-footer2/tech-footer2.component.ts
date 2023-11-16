import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tech-footer2',
  templateUrl: './tech-footer2.component.html',
  styleUrls: ['./tech-footer2.component.scss'],
})
export class TechFooter2Component implements OnInit {
  url = environment.url;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {}

  staffFaults() {
    this.router.navigate(['/technician-menu/all-job-cards']);
  }

  services() {
    this.router.navigate(['/technician-menu/all-service-cards']);
  }

  contactUs() {
    this.router.navigate(['/technician-menu/contact-loggedin']);
  }
  logOut() {
    this.storage.clear();
    console.log('User loggedout!');
    this.router.navigate(['/welcome']);
  }

}

