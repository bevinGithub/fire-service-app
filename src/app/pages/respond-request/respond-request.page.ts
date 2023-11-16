import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-respond-request',
  templateUrl: './respond-request.page.html',
  styleUrls: ['./respond-request.page.scss'],
})
export class RespondRequestPage implements OnInit {
  techID: any;
  spId: any;
  url = environment.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController
  ) {

  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.spId = this.activatedRoute.snapshot.paramMap.get('spID');
    console.log(this.spId);
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      if (user) {
        this.respondRequest(user?.id, this.spId);
      } else {
        this.storage.clear();
        this.presentAlertConfirm();
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'System Message',
      message: 'Please log in to respond to requests',
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

  async respondRequest(techId, spId) {
    const postData = {
      techID: techId, spID: spId
    };
    console.log(postData);
    const alert = await this.alertController.create({
      header: 'Request Response',
      message: 'Registration request from Service Provider.',
      buttons: [
        {
          text: 'Reject',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.http.post(this.url + 'tech-reject-response.php', postData).subscribe((res: any) => {
              console.log(res);
              if(res?.status === 'success') {
                this.requestMessage('Request has been successfully rejected!');
                this.router.navigate(['/technician-menu/technician-dashboard']);
              }
            });
          }
        }, {
          text: 'Accept',
          handler: () => {
            this.http.post(this.url + 'tech-accept-response.php', postData).subscribe((res: any) => {
              console.log(res);
              if(res?.status === 'success') {
                this.requestMessage('Request has been successfully accepted!');
                this.router.navigate(['/technician-menu/technician-dashboard']);
              }
              if (res?.status === 'error') {
                this.requestMessage('Request has been successfully accepted!');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async requestMessage(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

}
