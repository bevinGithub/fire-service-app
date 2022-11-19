import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-technician-menu',
  templateUrl: './technician-menu.page.html',
  styleUrls: ['./technician-menu.page.scss'],
})
export class TechnicianMenuPage implements OnInit {
  pages = [
    {
      title: 'HOME',
      url: 'technician-dashboard'
    },
    {
      title: 'JOB CARDS',
      url: 'technician-job-cards'
    },
    {
      title: 'SERVICE CARDS',
      url: 'technician-service-cards'
    },
    {
      title: 'PROFILE',
      url: 'user-profile'
    },
    {
      title: 'CONTACT US',
      url: 'contact-loggedin'
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
    this.router.navigate(['/technician-menu/' + url.page]);
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
