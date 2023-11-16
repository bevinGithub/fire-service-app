import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faults-fire-notifiations',
  templateUrl: './faults-fire-notifiations.page.html',
  styleUrls: ['./faults-fire-notifiations.page.scss'],
})
export class FaultsFireNotifiationsPage implements OnInit {
  fireProtection: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      if (user) {
        this.getFireCertificates(user?.id);
      } else {
        this.storage.clear();
        this.presentAlertConfirm();
      }
    });
  }

  getFireCertificates(techID) {
    this.http.get(this.url + 'tech-get-service-cards.php?techID=' + techID).subscribe((res: any) => {
      console.log(res);
      this.fireProtection = res;
    });
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'System Message',
      message: 'Please log in to view service cards',
      buttons: [
      {
          text: 'Okay',
          handler: () => {
            this.router.navigate(['/entry/signin']);
          }
        }
      ]
    });
    await alert.present();
  }

}
