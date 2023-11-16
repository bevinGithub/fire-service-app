import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-site',
  templateUrl: './request-site.page.html',
  styleUrls: ['./request-site.page.scss'],
})
export class RequestSitePage implements OnInit {
  site: any = {};
  disciplines: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.http.get(this.url + 'get-sp-list.php?userID=' + user?.id).subscribe((sps: any) => {
        console.log(sps);
        this.disciplines = sps?.spsList;
      });
      this.site.clientID =user.id;
    });
  }

  ngOnInit() {
  }

  async requestNewSite() {
    const loading = await this.loadingController.create({ message: 'Please wait...' });
    loading.present();
    console.log(this.site);
    this.http.post(this.url + 'sp-request-site.php', this.site).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        loading.dismiss();
        this.router.navigate(['/client-menu/client-dashboard']);
        this.siteNotification('Site request successfully submitted!');
      } else {
        loading.dismiss();
        this.siteNotification('Site request could not be submitted!');
      }
    }, err => {
      loading.dismiss();
      console.log(err);
    });
  }

  async siteNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

}
