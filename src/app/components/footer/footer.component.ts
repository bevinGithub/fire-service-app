import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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
    // this.storage.get('currentUser').then((data: any) => {
    //   const logData = { userID: data.id };
    //   this.http.post(this.url + 'last-login.php', logData).subscribe((resp: any) => {
    //     console.log(resp);
    //   });
    // });
    this.storage.clear();
    console.log('User loggedout!');
    this.router.navigate(['/welcome']);
  }

}
