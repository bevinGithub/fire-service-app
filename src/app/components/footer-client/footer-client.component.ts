import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.scss'],
})
export class FooterClientComponent implements OnInit {
  url = environment.url;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient
  ) { }

  ngOnInit() {}

  clientSites() {
    this.router.navigate(['/client-menu/client-sites']);
  }

  staff() {
    this.router.navigate(['/client-menu/client-staff']);
  }

  contactUs() {
    this.router.navigate(['/client-menu/contact-loggedin']);
  }

  logOut() {
    this.storage.clear();
    console.log('User loggedout!');
    this.router.navigate(['/welcome']);
  }

}
