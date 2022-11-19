import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-tech-entry',
  templateUrl: './tech-entry.page.html',
  styleUrls: ['./tech-entry.page.scss'],
})
export class TechEntryPage implements OnInit {
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
  showFooter: any;
  networkStatus: any;

  database: SQLiteObject;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController,
    private keyboard: Keyboard,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private platform: Platform,
  ) {
    this.showBanner = true;
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('action');
    this.platform.ready().then(() => {
      this.createDB();
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showBanner = true;
    //   this.keyboard.onKeyboardShow().subscribe(() => {
    //    console.log('Keyboard is out - Hide Footer Image');
    //    this.hideFooterBanner();
    //  });
    //  this.keyboard.onKeyboardHide().subscribe(() => {
    //   console.log('Keyboard is closed - show Footer Image');
    //   this.showFooterBanner();
    // });
  }

  ionViewDidEnter(){
   this.networkCheckerService.checkNetworkChange();
   this.networkStatus = this.networkCheckerService.isConnected();
  console.log('Connection Status: ' + this.networkStatus);
  }

  createDB() {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      //create Users table
      // eslint-disable-next-line max-len
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_users  (id INTEGER PRIMARY KEY, users_id int(11), role_id integer ,email VARCHAR(180), password VARCHAR(200))`,[])
      .then((res: any) => {
        console.log(res);
      });
      console.log('Database created!' + JSON.stringify(this.database));
    }).catch(err => {
      console.log('Database could not be created' + JSON.stringify(err));
    });
  }

  segmentChanged(ev) {
    console.log(ev);
  }


  checkUser() {
    console.log(this.userSignUp.mobile_number);
    this.http.post(this.url + 'check-technician-data.php', this.userSignUp).subscribe((res: any) => {
      console.log(res);
      if (res === 'No record Found') {
        this.noticeMessage('Invalid registration details!');
      }
      if (res?.status === 'Active') {
        this.noticeMessage('Technician is already active!');
        this.router.navigate(['/tech-entry/signin']);
      }
      if (res?.status === 'Inactive') {
        this.storage.set('userTechnician', res);
        this.noticeMessage('Technician successfully validated!');
        this.router.navigate(['/technician-registration']);
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
      duration: 4000
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
    this.networkStatus = this.networkCheckerService.isConnected();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus !== 'none') {
      this.http.post(this.url + 'process-login.php', this.userSignIn).subscribe((userInfo: any) => {
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
    } else {
      console.log('User offlline data');
    }
  }

  showPasswordText() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  hideFooterBanner() {
    this.showBanner = false;
    console.log('Hide Banner: ' + this.showBanner);
  }

  showFooterBanner() {
    this.showBanner = true;
    console.log('Show Banner: ' + this.showBanner);
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

  hideFooter2(ev) {
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

  hideFooterOnEmail(ev) {
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
