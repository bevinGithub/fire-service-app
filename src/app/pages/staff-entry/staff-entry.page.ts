import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-entry',
  templateUrl: './staff-entry.page.html',
  styleUrls: ['./staff-entry.page.scss'],
})
export class StaffEntryPage implements OnInit {
  activeTab: any;
  userSignUp: any = {};
  userSignIn: any = {};

  public type = 'password';
  public showPass = false;
  password: any;

  url = environment.url;
  client: any;
  response: any;
  validEmail: boolean;
  showBanner: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.showBanner = true;
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('action');
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showBanner = true;
  }
  segmentChanged(ev) {
    console.log(ev);
  }


  checkUser() {
    console.log(this.userSignUp);
    this.http.post(this.url + 'sp-check-staff-data.php', this.userSignUp).subscribe((res: any) => {
      console.log(res);
      if (res === 'No record Found') {
        this.noticeMessage('Invalid registration details!');
      }
      if (res?.status === 'Active') {
        this.noticeMessage('Client is already active!');
        this.router.navigate(['/staff-entry/signin']);
      }
      if (res?.status === 'Inactive') {
        this.storage.set('userStaff', res);
        this.noticeMessage('Staff member successfully validated!');
        this.router.navigate(['/staff-registration']);
      }
    });
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userSignUp.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  async noticeMessage(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 10000
    });
    toast.present();
  }

  checkEmailStaff() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userSignIn.email)) {
      console.log('Email valid');
      this.validEmail = true;
    } else {
      console.log('Not Email valid');
      this.validEmail = false;
    }
    console.log(this.validEmail);
  }

  loginUser() {
    this.http.post(this.url + 'sp-process-login.php', this.userSignIn).subscribe((userInfo: any) => {
      this.client = userInfo?.user;
      this.response = userInfo?.status;
      console.log(this.client.role_id);
      if (this.response === 'success') {
        this.storage.set('currentUser', this.client);
        if (this.client.role_id === '2') {
          this.noticeMessage('User has successfully logged in!');
          this.router.navigate(['/client-menu/client-dashboard']);
        }
        if (this.client.role_id === '3') {
          this.noticeMessage('User has successfully logged in!');
          this.router.navigate(['/staff-menu/staff-dashboard']);
        }
        if (this.client.role_id === '4') {
          this.noticeMessage('User has successfully logged in!');
          this.router.navigate(['/technician-menu/technician-dashboard']);
        }
      }
      if (this.response === 'error') {
        this.noticeMessage('Invalid email address or password!');
      }
    });
  }

  showPasswordText() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
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

}
