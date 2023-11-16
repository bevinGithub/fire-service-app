/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-technician-job-cards',
  templateUrl: './technician-job-cards.page.html',
  styleUrls: ['./technician-job-cards.page.scss'],
})
export class TechnicianJobCardsPage implements OnInit {
  jobs: any;
  techID: any;
  url = environment.url;

  networkStatus: any;
  networkType: any;
  database: SQLiteObject;
  offRes: any;
  faults: any;
  updateOfflineData: any;
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private loadingController: LoadingController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
    private activatedRoute: ActivatedRoute,
  ) {
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      const moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
      console.log('ModuleID: ' + moduleID);
      this.http.get(this.url + 'sp-get-job-cards.php?techID=' + user.id + '&moduleID=' + moduleID).subscribe((data: any) => {
        console.log(data);
        this.jobs = data;
      });
    });
    this.createTableFaultReports();
   }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.getJobcards(user.id);
    });
  }

  ionViewDidEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.networkCheckerService.checkNetworkChange();
      this.networkStatus = this.networkCheckerService.connectionType();
      console.log('Job Cards Connection Status: ' + this.networkStatus);
      console.log('Condition: ' + this.networkStatus);
      if (this.networkStatus === 'none') {
        console.log('We in here: ' + this.networkStatus);
        this.getOfflineJobCards(user.id);
      }
    });
  }

  createTableFaultReports() {
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
      // eslint-disable-next-line max-len
      const query = `CREATE TABLE IF NOT EXISTS fire_sp_fault_reports  (id INTEGER PRIMARY KEY AUTOINCREMENT, fault_id INTEGER, sp_id INTEGER, client_id INTEGER, staff_id INTEGER, technician_id INTEGER, site_id INTEGER, fault_reference VARCHAR(20), function TEXT , category TEXT, date_requested TEXT, control_panel_photo_2 VARCHAR(120), before_photo_2 VARCHAR(120), after_photo_2 VARCHAR(120), before_photo_blob BLOB, after_photo_blob BLOB , fault_details TEXT , status VARCHAR(30), tech_status VARCHAR(20), job_approved VARCHAR(20), scope_of_work TEXT , technician_comments TEXT , arrival_time TEXT, work_completed TEXT, general_comments TEXT, isReturn VARCHAR(12), return_details TEXT, return_date TEXT, date_signoff TEXT, client_signature BLOB, third_party_signature BLOB, third_party_name VARCHAR(60), third_party_surname VARCHAR(40), third_party_function VARCHAR(45), date_signed_off TEXT, date_assigned TEXT, date_accepted TEXT, date_completed TEXT, date_created TEXT, isSynced VARCHAR(15))`;
      this.database.executeSql(query,[])
      .then((res: any) => {
        console.log(res);
      });
      // this.database.executeSql(`DROP TABLE fire_fault_reports`,[]).then((res: any) => { console.log('table deleted'); });
      console.log('Table fire_sp_fault_reports created!' + JSON.stringify(this.database));
    }).catch(err => {
      console.log('Table fire_fault_reports could not be created' + JSON.stringify(err));
    });
  }

  getJobcards(userID) {
    console.log('Reload list' + userID);
    this.presentLoading();
    const moduleID = this.activatedRoute.snapshot.paramMap.get('moduleID');
    console.log('ModuleID: ' + moduleID);
    this.http.get(this.url + 'sp-get-job-cards.php?techID=' + userID + '&moduleID=' + moduleID).subscribe((data: any) => {
      console.log(data);
      this.jobs = data;
      if (this.jobs === 'No record Found') {
        console.log('No job Cards found!');
      } else {
        // eslint-disable-next-line guard-for-in, @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.jobs.length; i++) {
          console.log(this.jobs[i].id);
          this.database.executeSql(`SELECT * FROM fire_sp_fault_reports  WHERE fault_id=?`, [this.jobs[i].id]).then((res: any) => {
            if (res.rows.length > 0) {
              console.log(res.rows.item(0));
              const faultId = res.rows.item(0).fault_id;
              // eslint-disable-next-line max-len
              this.updateOfflineData = [this.jobs[i].client_id,this.jobs[i].sp_id, this.jobs[i].staff_id, this.jobs[i].technician_id, this.jobs[i].site_id, this.jobs[i].fault_reference, this.jobs[i].function, this.jobs[i].category, this.jobs[i].date_requested, this.jobs[i].control_panel_photo_2, this.jobs[i].before_photo_2, this.jobs[i].after_photo_2, this.jobs[i].fault_details, this.jobs[i].status, this.jobs[i].tech_status, this.jobs[i].job_approved, this.jobs[i].scope_of_work, this.jobs[i].technician_comments, this.jobs[i].arrival_time,this.jobs[i].work_completed, this.jobs[i].general_comments, this.jobs[i].isReturn, this.jobs[i].return_details, this.jobs[i].return_date, this.jobs[i].client_signature, this.jobs[i].third_party_signature, this.jobs[i].third_party_name, this.jobs[i].third_party_surname, this.jobs[i].third_party_function, this.jobs[i].date_signed_off, this.jobs[i].date_assigned, this.jobs[i].date_accepted, this.jobs[i].date_completed, this.jobs[i].date_created];
              this.database.executeSql(`UPDATE fire_sp_fault_reports SET client_id=?, sp_id=?, staff_id=?, technician_id=?, site_id=?, fault_reference=?, function=?, category=?, date_requested=?, control_panel_photo_2=?, before_photo_2=?, after_photo_2=?, fault_details=?, status=?, tech_status=?, job_approved=?, scope_of_work=?, technician_comments=?, arrival_time=?, work_completed=?, general_comments=?, isReturn=?, return_details=?, return_date=?, client_signature=?, third_party_signature=?, third_party_name=?, third_party_surname=?, third_party_function=?, date_signed_off=?, date_assigned=?, date_accepted=?, date_completed=?, date_created=?  WHERE fault_id = ${faultId}`, this.updateOfflineData)
              .then((update: any) => {
                console.log('Updated: ' + JSON.stringify(update));
              }, err => {
                console.log('Query Update error: ' + JSON.stringify(err));
              });

            } else {
              console.log('fault does no exists local db....');
                // eslint-disable-next-line max-len
              const insertQuery = `INSERT INTO fire_sp_fault_reports (fault_id, sp_id, client_id, staff_id, technician_id, site_id, fault_reference, function, category, date_requested, control_panel_photo_2, before_photo_2, after_photo_2, fault_details, status, tech_status, job_approved, scope_of_work, technician_comments, arrival_time, work_completed, general_comments, isReturn, return_details, return_date, client_signature, third_party_signature, third_party_name, third_party_surname, third_party_function, date_signed_off, date_assigned, date_accepted, date_completed, date_created) VALUES ('${this.jobs[i].id}', '${this.jobs[i].sp_id}', '${this.jobs[i].client_id}', '${this.jobs[i].staff_id}', '${this.jobs[i].technician_id}', '${this.jobs[i].site_id}', '${this.jobs[i].fault_reference}', '${this.jobs[i].function}', '${this.jobs[i].category}', '${this.jobs[i].date_requested}', '${this.jobs[i].control_panel_photo_2}', '${this.jobs[i].before_photo_2}', '${this.jobs[i].after_photo_2}', '${this.jobs[i].fault_details}', '${this.jobs[i].status}', '${this.jobs[i].tech_status}', '${this.jobs[i].job_approved}', '${this.jobs[i].scope_of_work}', '${this.jobs[i].technician_comments}', '${this.jobs[i].arrival_time}','${this.jobs[i].work_completed}', '${this.jobs[i].general_comments}', '${this.jobs[i].isReturn}', '${this.jobs[i].return_details}', '${this.jobs[i].return_date}', '${this.jobs[i].client_signature}', '${this.jobs[i].third_party_signature}', '${this.jobs[i].third_party_name}', '${this.jobs[i].third_party_surname}', '${this.jobs[i].third_party_function}', '${this.jobs[i].date_signed_off}', '${this.jobs[i].date_assigned}', '${this.jobs[i].date_accepted}', '${this.jobs[i].date_completed}', '${this.jobs[i].date_created}')`;
              // console.log(insertQuery);
              this.database.executeSql(insertQuery,[])
              .then((resAdd: any) => {
                // console.log('NEW RECORD ADDED: ' + JSON.stringify(resAdd));
              });
            }
          }, err => {
            console.log(err);
          });
        }
      }
    }, err => {
      // console.log('Error: ' + JSON.stringify(err));
    });
  }

  getOfflineJobCards(techId) {
    console.log('Tech ID: ' + techId);
    this.presentLoading();
    const offData = [];
    const query = 'SELECT *, fault_id as id FROM fire_sp_fault_reports JOIN fire_sp_sites ON  fire_sp_fault_reports.site_id = fire_sp_sites.site_id WHERE fire_sp_fault_reports.technician_id=?';
    this.database.executeSql(query, [techId]).then((res: any) => {
      if (res.rows.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i=0; i < res.rows.length; i++) {
           offData.push(res.rows.item(i));
        }
        this.jobs = offData;
        console.log(this.jobs);
      } else {
        console.log('There is no job cards');
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  test() {
    const sites = [];
    const query = 'SELECT *, fault_id as id FROM fire_sp_fault_reports JOIN fire_sp_sites ON  fire_sp_fault_reports.site_id = fire_sp_sites.site_id';
    this.database.executeSql(query, []).then((res: any) => {
      if (res.rows.length > 0) {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let i=0; i < res.rows.length; i++) {
          sites.push(res.rows.item(i));
        }
        console.log(sites);
      } else {
        console.log('There is no job cards');
      }
    });
  }


}
