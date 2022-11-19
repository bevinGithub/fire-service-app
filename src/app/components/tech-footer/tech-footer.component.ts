import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tech-footer',
  templateUrl: './tech-footer.component.html',
  styleUrls: ['./tech-footer.component.scss'],
})
export class TechFooterComponent implements OnInit {
  url = environment.url;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {}

  staffFaults() {
    this.router.navigate(['/technician-menu/technician-service-cards']);
  }

  services() {
    this.router.navigate(['/technician-menu/technician-job-cards']);
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
