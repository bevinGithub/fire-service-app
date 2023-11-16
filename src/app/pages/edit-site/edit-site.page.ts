import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.page.html',
  styleUrls: ['./edit-site.page.scss'],
})
export class EditSitePage implements OnInit {
  site: any = {};
  url = environment.url;
  siteID: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private activatedRoute: ActivatedRoute
  ) {
      this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
      console.log(this.siteID);
      this.http.get(this.url + 'sp-get-site-edit-data.php?siteID=' + this.siteID).subscribe((site: any) => {
        this.site = site;
      });
  }

  ngOnInit() {
  }

  updateSiteData() {
    console.log(this.site);
    this.http.post(this.url + 'sp-request-site-update.php', this.site).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.router.navigate(['/client-menu/client-sites']);
        this.siteNotification('Site updated successfully submitted!');
      } else {
        this.siteNotification('Site update could not be submitted!');
      }
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
