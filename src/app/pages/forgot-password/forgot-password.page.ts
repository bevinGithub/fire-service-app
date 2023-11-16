import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  user: any = {};
  validEmail: boolean;
  url = environment.url;
  showBanner: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastController: ToastController,
    public keyboard: Keyboard
  ) {
    this.showBanner = true;
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showBanner = true;
 }

  forgotPassword() {
    this.http.post(this.url + 'process-forgot-password.php', this.user).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.systemNotification('Password request has been successful please check in your inbox for a new password!');
        this.router.navigate(['/entry/signin']);
      } else {
        this.systemNotification('Invalid activation code!');
      }
    });
  }

  async systemNotification(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  hideFooter(ev) {
    console.log(ev.detail.target.type);
    if (ev.detail.target.type === 'email') {
      this.showBanner = false;
      console.log('Hide Footer');
    } else {
      this.showBanner = true;
      console.log('Show Footer');
    }
  }

}
