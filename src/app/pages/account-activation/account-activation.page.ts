import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.page.html',
  styleUrls: ['./account-activation.page.scss'],
})
export class AccountActivationPage implements OnInit {
  user: any = {};
  url = environment.url;
  showBanner: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController
  ) {
    this.showBanner = true;
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showBanner = true;
  }

  activateAccount() {
    this.http.post(this.url + 'activateAccount.php', this.user).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.systemNotification('Client has successfully activated account!');
        this.router.navigate(['/entry/signin']);
      } else {
        this.systemNotification('Invalid activation code!');
      }
    });
  }

  async systemNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  hideFooterOnMobile(ev) {
    console.log(ev.detail.target.type);
    if (ev.detail.target.type === 'tel') {
      this.showBanner = false;
      console.log('Hide Footer');
    } else {
      this.showBanner = true;
      console.log('Show Footer');
    }
  }
}
