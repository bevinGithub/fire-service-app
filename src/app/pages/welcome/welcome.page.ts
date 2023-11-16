/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  url = environment.url;
  database: SQLiteObject;
  users: any;
  sites: any;
  clients: any[]=[];
  constructor(
    private http: HttpClient,
    private platform: Platform,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService
  ) {
    this.platform.ready().then(() => {
      this.networkCheckerService.checkNetworkChange();
      const status = this.networkCheckerService.getNetworkStatus();
      console.log('Network Type: ' + status);
    });
    console.log(this.url);
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
   this.sqlite.create({
    name: 'fireservices.db',
    location: 'default',
   }).then((db: SQLiteObject) => {
    this.database = db;
    //this.dropTable();
    // eslint-disable-next-line max-len
    this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_sp_users  (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, sp_id INTEGER,  client_id INTEGER, role_id INTEGER, firstname VARCHAR(30), surname VARCHAR(30), email VARCHAR(180), email_notification VARCHAR(180), mobile_number VARCHAR(20), phone_number VARCHAR(20), company_name VARCHAR(100), saqcc_number VARCHAR(60), company_registration VARCHAR(60), job_function VARCHAR(60), site_one VARCHAR(30),  site_two VARCHAR(30), site_three VARCHAR(30), status VARCHAR(15), password VARCHAR(200), player_id VARCHAR(180), profile_photo VARCHAR(80), isMain VARCHAR(10), date_created TEXT)`,[])
    .then((res: any) => {
      console.log('Users table Created: ' + res);
    });

    // eslint-disable-next-line max-len
    this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_sp_sites  (id INTEGER PRIMARY KEY AUTOINCREMENT, site_id INTEGER, sp_id INTEGER, client_id INTEGER, site_contract VARCHAR(30), site_name VARCHAR(30), site_location VARCHAR(30), site_address TEXT, site_leader VARCHAR(30), site_contact_number VARCHAR(30), protected_areas VARCHAR(30), responsible_person VARCHAR(60), responsible_email VARCHAR(180), system_category VARCHAR(30), system_code VARCHAR(30), type_of_system VARCHAR(30), service_contract_number VARCHAR(30), service_date_1 TEXT, service_date_1_to TEXT, service_date_2 TEXT, service_date_2_to TEXT, service_date_3 TEXT, service_date_3_to TEXT, selected_service_date TEXT, next_service_date TEXT, service_due_date TEXT, service_notification_date TEXT, service_duration_type TEXT, isCertificate TEXT, site_status TEXT, certificate_date_created TEXT, date_created TEXT)`,[])
    .then((res: any) => {
      console.log(res);
    }, err => {
      console.log(err);
    });

    // eslint-disable-next-line max-len
    this.database.executeSql(`CREATE TABLE IF NOT EXISTS fire_service_providers  (id INTEGER PRIMARY KEY AUTOINCREMENT, sp_id INTEGER, user_id INTEGER, company_type VARCHAR(80), business_name VARCHAR(80), business_trading_name VARCHAR(100), business_address TEXT, registration_number VARCHAR(30), contact_email VARCHAR(180),status TEXT, date_created TEXT)`,[])
    .then((res: any) => {
      console.log(res);
    }, err => {
      console.log(err);
    });


    //ADD CLIENTS
    this.addUsers();
    //ADD SITES
    this.addSites();
    // ADD SERVICE PROVIDERS
    this.addServiceProviders();
    // this.dropTable();
    this.viewServiceProviders();
   });
  }

  addUsers() {
    this.http.get(this.url + 'all-users.php').subscribe((user: any) => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0; i < user.length; i++) {
        const query = 'SELECT * FROM fire_sp_users  WHERE email=?';
        this.database.executeSql(query, [user[i].email]).then((res: any) => {
          if (res.rows.length > 0) {
            console.log('User exists....');
          } else {
            // eslint-disable-next-line max-len
            this.database.executeSql(`INSERT INTO fire_sp_users (user_id, sp_id, client_id, role_id, firstname, surname, email, mobile_number, phone_number, company_name, saqcc_number, company_registration, job_function, site_one, site_two, site_three, status, password, player_id, profile_photo, isMain, date_created) VALUES ('${user[i].id}','${user[i].sp_id}', '${user[i].client_id}', '${user[i].role_id}', '${user[i].firstname}', '${user[i].surname}', '${user[i].email}', '${user[i].mobile_number}', '${user[i].phone_number}', '${user[i].company_name}', '${user[i].saqcc_number}', '${user[i].company_registration}', '${user[i].job_function}', '${user[i].site_one}', '${user[i].site_two}', '${user[i].site_three}', '${user[i].status}', '${user[i].password}', '${user[i].player_id}', '${user[i].profile_photo}', '${user[i].isMain}', '${user[i].date_created}') `,[])
            .then((resAdd: any) => {
              console.log('Query Result: ' + JSON.stringify(resAdd));
            });
          }
        }, err => {
          console.log(err);
        });
      }
    });
  }

  addSites() {
    this.http.get(this.url + 'sp-all-sites.php').subscribe((site: any) => {
      console.log(site);
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0; i < site.length; i++) {
        const query = 'SELECT * FROM fire_sp_sites  WHERE site_id=?';
        this.database.executeSql(query, [site[i].id]).then((res: any) => {
          if (res.rows.length > 0) {
            console.log('Site exists....');
            const siteL = res.rows.item(0);
            console.log(siteL);
            const fields = [siteL.client_id, siteL.sp_id, siteL.site_contract,siteL.site_name,siteL.site_location,siteL.site_address,siteL.site_leader,siteL.site_contact_number,siteL.protected_areas,siteL.responsible_person,siteL.responsible_email,siteL.system_category,siteL.system_code,siteL.type_of_system,siteL.service_contract_number,siteL.site_status];
            this.database.executeSql(`UPDATE fire_sp_sites SET client_id=?,sp_id=?, site_contract=?, site_name=?, site_location=?, site_address=?, site_leader=?, site_contact_number=?, protected_areas=? , responsible_person=?, responsible_email=?, system_category=?, system_code=?, type_of_system=?, service_contract_number=?, site_status=? WHERE site_id=${siteL.site_id}`, fields)
            .then((siteUpdate: any) => {
              console.log('SITE UPDATED: ' + JSON.stringify(siteUpdate));
            });
          } else {
            console.log('Next Query: ');
            // eslint-disable-next-line max-len
            this.database.executeSql(`INSERT INTO fire_sp_sites (site_id, sp_id, client_id , site_contract , site_name , site_location , site_address , site_leader , site_contact_number , protected_areas , responsible_person, responsible_email, system_category , system_code , type_of_system , service_contract_number , service_date_1 , service_date_1_to , service_date_2 , service_date_2_to , service_date_3 , service_date_3_to , selected_service_date , next_service_date , service_due_date , service_notification_date , service_duration_type , isCertificate , site_status , certificate_date_created , date_created ) VALUES ('${site[i].id}','${site[i].sp_id}', '${site[i].client_id}', '${site[i].site_contract}', '${site[i].site_name.replace(/\'/g,"''")}', '${site[i].site_location.replace(/\'/g,"''")}', '${site[i].site_address}', '${site[i].site_leader}', '${site[i].site_contact_number}', '${site[i].protected_areas}', '${site[i].responsible_person}', '${site[i].responsible_email}', '${site[i].system_category}', '${site[i].system_code}', '${site[i].type_of_system}', '${site[i].service_contract_number}', '${site[i].service_date_1}', '${site[i].service_date_1_to}', '${site[i].service_date_2}', '${site[i].service_date_2_to}', '${site[i].service_date_3}', '${site[i].service_date_3_to}', '${site[i].selected_service_date}', '${site[i].next_service_date}', '${site[i].service_due_date}', '${site[i].service_notification_date}', '${site[i].service_duration_type}', '${site[i].isCertificate}', '${site[i].site_status}', '${site[i].certificate_date_created}', '${site[i].date_created}') `,[])
            .then((resAdd: any) => {
              console.log('Query Result: ' + JSON.stringify(resAdd));
            });
          }
        }, err => {
          console.log(err);
        });
      }
    });
  }

  addServiceProviders() {
    this.http.get(this.url + 'sp-all-service-providers-list.php').subscribe((sp: any) => {
      console.log(sp);
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for(let i=0; i < sp.length; i++) {
        const query = 'SELECT * FROM fire_service_providers  WHERE sp_id=?';
        this.database.executeSql(query, [sp[i].id]).then((res: any) => {
          if (res.rows.length > 0) {
            console.log('Service Provider exists....');
            const siteL = res.rows.item(0);
            console.log(siteL);
            const fields = [siteL.sp_id, siteL.user_id, siteL.company_type,siteL.business_name,siteL.business_trading_name,siteL.business_address,siteL.registration_number,siteL.contact_email,siteL.status];
            this.database.executeSql(`UPDATE fire_service_providers SET sp_id=?, user_id=?, company_type=?, business_name=?, business_trading_name=?, business_address=?, registration_number=?, contact_email=?,status=? WHERE sp_id=${siteL.sp_id}`, fields)
            .then((siteUpdate: any) => {
              console.log('Service Provider UPDATED: ' + JSON.stringify(siteUpdate));
            });
          } else {
            console.log('Next Query: ');
            // eslint-disable-next-line max-len
            this.database.executeSql(`INSERT INTO fire_service_providers (sp_id, user_id, company_type, business_name, business_trading_name, business_address, registration_number, contact_email,status, date_created ) VALUES ('${sp[i].id}','${sp[i].user_id}', '${sp[i].company_type}', '${sp[i].business_name}', '${sp[i].business_trading_name.replace(/\'/g,"''")}', '${sp[i].business_address.replace(/\'/g,"''")}', '${sp[i].registration_number}', '${sp[i].contact_email}', '${sp[i].status}', '${sp[i].date_created}') `,[])
            .then((resAdd: any) => {
              console.log('Service Provider Result: ' + JSON.stringify(resAdd));
            });
          }
        }, err => {
          console.log(err);
        });
      }
    });
  }

  viewServiceProviders() {
    const query = 'SELECT * FROM fire_sp_users';
    this.database.executeSql(query, []).then((res: any) => {
      if (res.rows.length > 0) {
        for(let i=0; i < res.rows.length; i++) {
          console.log(res.rows.item(i));
          this.clients.push(res.rows.item(i));
       }
      }
    }, err => {
      console.log(err);
    });
  }

  dropTable() {
    this.database.executeSql(`DROP table fire_sp_users `,[])
    .then((resAdd: any) => {
      console.log('Query Result: ' + JSON.stringify(resAdd));
    });
  }

}
