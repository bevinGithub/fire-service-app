import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-rejected-service-certificate',
  templateUrl: './view-rejected-service-certificate.page.html',
  styleUrls: ['./view-rejected-service-certificate.page.scss'],
})
export class ViewRejectedServiceCertificatePage implements OnInit {
  service: any;
  url = environment.url;
  serviceID: any;
  site: any;
  tech: any;
  staff: any;
  networkStatus: any;
  database: SQLiteObject;
  constructor(
    private http: HttpClient,
    private router: Router,
    private sqlite: SQLite,
    private activatedRoute: ActivatedRoute,
    private networkCheckerService: NetworkCheckerService,
  ) {
    this.serviceID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    console.log(this.serviceID);
    this.http.get(this.url + 'get-rejected-service-details-2.php?id=' + this.serviceID).subscribe((data: any) => {
      console.log(data);
      this.service = data.certificate;
      this.site = data.site;
      this.tech = data.technician;
      this.staff = data.staff;
    });
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    console.log('Connection Status: ' + this.networkStatus);
    if (this.networkStatus === 'none') {
      this.sqlite.create({
        name: 'fireservices.db',
        location: 'default',
       }).then((db: SQLiteObject) => {
         this.database = db;
         this.getOfflineSC(this.serviceID);
       });
    }

  }
  ngOnInit() {
  }

  getOfflineSC(scID) {
    console.log(scID);
    const offData = [];
    // eslint-disable-next-line max-len
    const querySC = 'SELECT *,fire_sp_service_certificates.service_status AS cert_status  FROM fire_sp_service_certificates INNER JOIN fire_users ON fire_sp_service_certificates.client_id=fire_sp_users.user_id  WHERE fire_sp_service_certificates.cert_id=?';
    this.database.executeSql(querySC,[scID]).then((rec: any) => {
      console.log('SC: ' + JSON.stringify(rec));
      console.log('Record Found: ' + rec.rows.length);
      if (rec.rows.length > 0) {
       this.service = rec.rows.item(0);
       console.log(this.service);
       //#GET TECH DATA
       const query = 'SELECT * FROM fire_sp_users WHERE user_id=?';
       this.database.executeSql(query, [this.service?.service_technician_id]).then((res2: any) => {
          console.log('TECH DATA: ' + JSON.stringify(res2));
          if (res2.rows.length > 0) {
            this.tech = res2.rows.item(0);
          }
       });
       //GET CLIENT DATA
       const queryClient = 'SELECT * FROM fire_sp_users WHERE client_id=?';
       this.database.executeSql(queryClient, [this.service?.client_id]).then((resClient: any) => {
          console.log('TECH DATA: ' + JSON.stringify(resClient));
          if (resClient.rows.length > 0) {
            this.staff = resClient.rows.item(0);
          }
       });
       //GET SITE DATA
       const querySite = 'SELECT * FROM fire_sp_sites WHERE site_id=?';
       this.database.executeSql(querySite, [this.service?.site_id]).then((resSite: any) => {
          console.log('TECH DATA: ' + JSON.stringify(resSite));
          if (resSite.rows.length > 0) {
            this.site = resSite.rows.item(0);
          }
       });

      }
    });
  }

}
