import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.page.html',
  styleUrls: ['./site-details.page.scss'],
})
export class SiteDetailsPage implements OnInit {
  site: any;
  siteID: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController
  ) {
    this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
    this.getSiteData(this.siteID);
  }

  ngOnInit() {
  }

  editSite(site) {
    console.log(site);
    this.router.navigate(['/edit-site/' + site.id]);
  }

  removeSite(site) {
    console.log(site);
    this.http.get(this.url + 'remove-site.php?siteID=' + site.id).subscribe((data: any) => {
      console.log(data);
      this.site = data;
      if (this.site === 'success') {
        this.siteNotification('Site has been successfuly removed!');
        this.router.navigate(['/client-menu/client-sites']);
      } else {
        this.siteNotification('Site could not be removed!');
      }
    });
  }

  async siteNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.siteID = this.activatedRoute.snapshot.paramMap.get('siteID');
    console.log(this.siteID);
    this.getSiteData(this.siteID);
  }

  getSiteData(siteID) {
    this.http.get(this.url + 'sp-get-site.php?siteID=' + siteID).subscribe((data: any) => {
      console.log(data);
      this.site = data;
    });
  }
}
