import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-staff-menu',
  templateUrl: './staff-menu.page.html',
  styleUrls: ['./staff-menu.page.scss'],
})
export class StaffMenuPage implements OnInit {
  pages = [
    {
      title: 'HOME',
      url: 'staff-dashboard'
    },
    {
      title: 'NOTIFICATIONS',
      url: 'notifications'
    },
    {
      title: 'FIRE ALARMS',
      url: 'fire-alarms'
    },
    {
      title: 'FAULT REPORTS',
      // url: 'alarms-fault-reports'
      url: 'staff-dashboard'
    },
    {
      title: 'SERVICES',
      // url: 'alarms-services'
      url: 'staff-dashboard'
    },
    {
      title: 'SPRINKLERS',
      url: 'sprinklers'
    },
    {
      title: 'FIRE HYDRANTS',
      url: 'fire-hydrants'
    },
    {
      title: 'FIRE HOSES',
      url: 'fire-hoses'
    },
    {
      title: 'FIRE EXTINGUISHERS',
      url: 'fire-extinguishers'
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
    this.router.navigate(['/staff-menu/' + url.page]);
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
