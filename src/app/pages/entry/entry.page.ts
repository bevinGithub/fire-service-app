import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController, AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
  providers:[Keyboard]
})
export class EntryPage implements OnInit {
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
  networkType: any;
  database: SQLiteObject;
  offRes: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private toastController: ToastController,
    private keyboard: Keyboard,
    private alertController: AlertController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private platform: Platform,
  ) {
    this.activeTab = this.activatedRoute.snapshot.paramMap.get('action');
    this.showBanner = true;
    this.showFooter = true;
    this.platform.ready().then(() => {
      this.createDB();
    });
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.showBanner = true;
  }

  ionViewDidEnter(){
    this.networkCheckerService.checkNetworkChange();
    this.networkType = this.networkCheckerService.getNetworkStatus();
    console.log('Network Type: ' + this.networkType);
  }

  createDB() {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      // eslint-disable-next-line max-len
      this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_users  (id  INTEGER PRIMARY KEY AUTOINCREMENT, user_id ENTEGER,  client_id ENTEGER, role_id ENTEGER, firstname VARCHAR(30), surname VARCHAR(30), email VARCHAR(180), email_notification VARCHAR(180), mobile_number VARCHAR(20), phone_number VARCHAR(20), company_name VARCHAR(100), saqcc_number VARCHAR(60), company_registration VARCHAR(60), job_function VARCHAR(60), site_one VARCHAR(30),  site_two VARCHAR(30), site_three VARCHAR(30), status VARCHAR(15), password VARCHAR(200), player_id VARCHAR(180), profile_photo VARCHAR(80), isMain VARCHAR(10), date_created TEXT)`,[])
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
    console.log(this.userSignUp.company_registration_number);
    this.http.post(this.url + 'get-client-data.php', this.userSignUp).subscribe((res: any) => {
      console.log(res);
      if (res === 'No record Found') {
        this.noticeMessage('Invalid Company Registration Number!');
      }
      if (res?.status === 'Active') {
        this.noticeMessage('Client is already active!');
        this.router.navigate(['/entry/signin']);
      }
      if (res?.status === 'Inactive') {
        this.storage.set('userClient', res);
        this.noticeMessage('Company Registration Number successfully validated!');
        this.router.navigate(['/client-registration']);
      }
    });
  }

  checkEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userSignIn.email)) {
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

  loginUser() {
    this.networkStatus = this.networkCheckerService.isConnected();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus !== 'none') {
      this.http.post(this.url + 'process-login.php', this.userSignIn).subscribe((userInfo: any) => {
        console.log(userInfo);
        this.client = userInfo?.user;
        this.response = userInfo?.status;
        if (userInfo.status === 'success') {
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
            // CHECK IF USER EXISTS
            const query = 'SELECT * FROM fire_users  WHERE email=?';
            this.database.executeSql(query, [this.userSignIn.email]).then((res: any) => {
              console.log('RESULT: '+ JSON.stringify(res.rows.item(0)));
              if (res.rows.length > 0) {
                console.log('User exists....');
              } else {
              // eslint-disable-next-line max-len
             //this.database.executeSql(`INSERT INTO fire_users (users_id, role_id, firstname, surname, email, password) VALUES ('${this.client.id}', '${this.client.role_id}', '${this.client.firstname}', '${this.client.surname}', '${this.client.email}', '${this.userSignIn.password}') `,[])
             const user = userInfo?.user;
             // eslint-disable-next-line max-len
             this.database.executeSql(`INSERT INTO fire_users (user_id, client_id, role_id, firstname, surname, email, mobile_number, phone_number, company_name, saqcc_number, company_registration, job_function, site_one, site_two, site_three, status, password, player_id, profile_photo, isMain, date_created) VALUES ('${user.id}', '${user.client_id}', '${user.role_id}', '${user.firstname}', '${user.surname}', '${user.email}', '${user.mobile_number}', '${user.phone_number}', '${user.company_name}', '${user.saqcc_number}', '${user.company_registration}', '${user.job_function}', '${user.site_one}', '${user.site_two}', '${user.site_three}', '${user.status}', '${this.userSignIn.password}', '${user.player_id}', '${user.profile_photo}', '${user.isMain}', '${user.date_created}') `,[])
              .then((resAdd: any) => {
                console.log('Query Result: ' + JSON.stringify(resAdd));
              });
              }
            }, err => {
              console.log(err);
            });
            this.noticeMessage('User has successfully logged in!');
            this.router.navigate(['/technician-menu/technician-dashboard']);
          }
        }
        if (this.response === 'error') {
          this.noticeMessage('Invalid email address or password!');
        }
      });
    } else {
      console.log('Use Local Database' + this.networkType);
      const email = this.userSignIn.email;
      const password  = this.userSignIn.password;
      const query = 'SELECT * FROM fire_users  WHERE email=? AND password=?';
      this.database.executeSql(query, [email, password]).then((res: any) => {
        console.log('RESULT: '+ JSON.stringify(res.rows.item(0)));
        this.offRes = res.rows.item(0);
        if (res.rows.length > 0) {
          this.storage.set('currentOfflineUser', this.offRes);
          this.router.navigate(['/technician-menu/technician-dashboard']);
        } else {
          this.noticeMessage('Invalid email address or password!');
        }
      }, err => {
        console.log(err);
      });
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
