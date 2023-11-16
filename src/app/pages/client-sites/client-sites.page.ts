import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-sites',
  templateUrl: './client-sites.page.html',
  styleUrls: ['./client-sites.page.scss'],
})
export class ClientSitesPage implements OnInit {
  sites: any;
  clientID: any;
  url = environment.url;

  constructor(
    private http: HttpClient,
    private storage: Storage,
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.viewSiteDetails();
  }

  viewSiteDetails() {
    this.storage.get('currentUser').then((client: any) => {
      console.log(client);
      this.clientID = client.id;
      this.http.get(this.url + 'sp-get-client-sites.php?clientID=' + this.clientID).subscribe((sitesRes: any) => {
        console.log(sitesRes);
        this.sites = sitesRes;
      });
    });
  }
}
