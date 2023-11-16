import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.page.html',
  styleUrls: ['./client-registration.page.scss'],
})
export class ClientRegistrationPage implements OnInit {
  client: any = {};
  clientInfo: any;

  public type = 'password';
  public type1 = 'password';
  public type2 = 'password';
  public showPass = false;
  public showPass1 = false;
  public showPass2 = false;
  password: any;
  confirmPassword: any;
  validPassword: boolean;
  isChecked: boolean;
  validEmail: boolean;

  url = environment.url;
  showBanner: boolean;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private toastController: ToastController,
    private router: Router
  ) {
    this.showBanner = true;
    this.storage.get('userClient').then((clientData: any) => {
      console.log(clientData);
      this.clientInfo = clientData;
      this.client.userID = this.clientInfo.id;
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showBanner = true;
  }
  showPasswordRegister() {
    this.showPass1 = !this.showPass1;
    if (this.showPass1) {
      this.type1 = 'text';
    } else {
      this.type1 = 'password';
    }
  }

  showPasswordRegsiterConfirm() {
    this.showPass2 = !this.showPass2;
    if (this.showPass2) {
      this.type2 = 'text';
    } else {
      this.type2 = 'password';
    }
  }

  checkPassword() {
    this.validPassword = false;
    this.password = this.client.password;
    this.confirmPassword = this.client.confirm_password;
    if (this.password === this.confirmPassword) {
      console.log('Password do match');
      this.validPassword = true;
    } else {
      console.log('Error on password');
      this.validPassword = false;
    }
    console.log(this.validPassword);
  }

  async systemConfirmation(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  termsChecked(ev) {
    console.log( ev.target.checked);
    if ( ev.target.checked === true) {
      ev.target.checked = true;
      this.isChecked = true;
    } else {
      ev.target.checked = false;
      this.isChecked = false;
    }
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.client.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  submitClientRegistration() {
    console.log(this.client);
    this.http.post(this.url + 'process-sp-client-registration.php', this.client).subscribe((user: any) => {
      console.log(user);
      if(user.status === 'success') {
        this.systemConfirmation('User successfully registered! Please check your email for activation code');
        this.router.navigate(['/account-activation']);
      }  else if (user.status === 'not activated') {
        this.systemConfirmation('Your account needs to be activated, please check your email for activation code!');
        this.router.navigate(['/account-activation']);
      } else if (user.status === 'email exists') {
        this.systemConfirmation('User email address is already in use!');
      } else {
        this.systemConfirmation('User could not be registered!');
      }
    });
  }

  hideFooter(ev) {
    console.log(ev);
    if (ev.detail.target.type === 'text') {
      this.showBanner = false;
      console.log('Hide Footer');
    } else {
      this.showBanner = true;
      console.log('Show Footer');
    }
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

  hideFooterOnPass(ev) {
    console.log(ev.detail.target.type);
    if (ev.detail.target.type === 'password') {
      this.showBanner = false;
      console.log('Hide Footer');
    } else {
      this.showBanner = true;
      console.log('Show Footer');
    }
  }
  hideFooterOnPass2(ev) {
    console.log(ev.detail.target.type);
    if (ev.detail.target.type === 'password') {
      this.showBanner = false;
      console.log('Hide Footer');
    } else {
      this.showBanner = true;
      console.log('Show Footer');
    }
  }
}
