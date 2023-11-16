import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-faults-tech-notifications',
  templateUrl: './faults-tech-notifications.page.html',
  styleUrls: ['./faults-tech-notifications.page.scss'],
})
export class FaultsTechNotificationsPage implements OnInit {
  jobs: any;
  techID: any;
  url = environment.url;
  faults: any;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private loadingController: LoadingController,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController
  ) {

   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      if (user) {
        this.http.get(this.url + 'sp-get-fault-cards-notifications.php?techID=' + user.id).subscribe((data: any) => {
          console.log(data);
          this.jobs = data;
        });
      } else {
        this.storage.clear();
        this.presentAlertConfirm();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'System Message',
      message: 'Please log in to view job cards',
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
