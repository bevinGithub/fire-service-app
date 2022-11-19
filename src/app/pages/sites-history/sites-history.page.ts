import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sites-history',
  templateUrl: './sites-history.page.html',
  styleUrls: ['./sites-history.page.scss'],
})
export class SitesHistoryPage implements OnInit {
  sites: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.http.get(this.url + 'get-client-sites-new.php?clientID=' + user?.id).subscribe((site: any) => {
        console.log(site);
        this.sites = site;
      });
    });
  }

  ngOnInit() {
  }

}
