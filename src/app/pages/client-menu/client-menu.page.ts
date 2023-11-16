import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.page.html',
  styleUrls: ['./client-menu.page.scss'],
})
export class ClientMenuPage implements OnInit {
  pages = [
    {
      title: 'HOME',
      url: 'client-dashboard'
    },
    {
      title: 'SITES',
      url: 'client-sites'
    },
    {
      title: 'STAFF',
      url: 'client-staff'
    },
    {
      title: 'CONTACT US',
      url: 'contact-loggedin'
    },
    {
      title: 'PROFILE',
      url: 'client-profile'
    },
    {
      title: 'CHANGE SP',
      url: 'request-service-provider'
    },
    {
      title: 'LOGOUT',
      url: 'logout'
    },
  ];
  url = environment.url;
  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient
  ) {
    console.log(this.pages);
  }

  ngOnInit() {
  }

  loadPage(url) {
    console.log(url);
    this.router.navigate(['/client-menu/' + url.page]);
  }

  logOut() {
    this.storage.get('currentUser').then((data: any) => {
      const logData = { userID: data.id };
      this.http.post(this.url + 'last-login.php', logData).subscribe((resp: any) => {
        console.log(resp);
      });
    });
    this.storage.clear();
    console.log('User loggedout!');
    this.router.navigate(['/welcome']);
  }

}
