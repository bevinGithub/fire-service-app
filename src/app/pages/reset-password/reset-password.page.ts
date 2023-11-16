import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user: any = {};
  roleID: any;
  validEmail: boolean;
  url = environment.url;
  email: any;
  userID: any;

  public type = 'password';
  public showPass = false;
  password: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.roleID = user.role_id;
      this.user.userID = user.id;

    });
  }

  ngOnInit() {
  }

  resetPassword() {
    this.http.post(this.url + 'reset-password.php', this.user).subscribe((res: any) => {
      console.log(res);
      if (res.status === 'success') {
        this.systemNotification('Password request has been successful please check in your inbox for a new password!');
        if (this.roleID === '2') {
          this.router.navigate(['/client-menu/client-dashboard']);
        }
        if (this.roleID === '3') {
          this.router.navigate(['/staff-menu/staff-dashboard']);
        }
        if (this.roleID === '4') {
          this.router.navigate(['/technician-menu/technician-dashboard']);
        }
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

  showPasswordText() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
