import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-site',
  templateUrl: './request-site.page.html',
  styleUrls: ['./request-site.page.scss'],
})
export class RequestSitePage implements OnInit {
  site: any = {};
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.site.clientID =user.id;
    });
  }

  ngOnInit() {
  }

  requestNewSite() {
    console.log(this.site);
    this.http.post(this.url + 'request-site.php', this.site).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.router.navigate(['/client-menu/client-dashboard']);
        this.siteNotification('Site request successfully submitted!');
      } else {
        this.siteNotification('Site request could not be submitted!');
      }
    });
  }

  async siteNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

}
