import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CompanyRepSignaturePage } from 'src/app/modals/company-rep-signature/company-rep-signature.page';
import { ServiceClientSignaturePage } from 'src/app/modals/service-client-signature/service-client-signature.page';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-service-control-panel-details',
  templateUrl: './service-control-panel-details.page.html',
  styleUrls: ['./service-control-panel-details.page.scss'],
})
export class ServiceControlPanelDetailsPage implements OnInit {
  panels: any;
  vents: any;
  fans: any;
  actuators: any;
  curtains: any;
  site: any;
  panel: any;
  cert: any;
  summary: any;
  url = environment.url;
  role: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private toastController: ToastController,
    private networkCheckerService: NetworkCheckerService,
    private sqlite: SQLite,
  ) {
    const certficateID = this.activatedRoute.snapshot.paramMap.get('certificateID');
    const panelID = this.activatedRoute.snapshot.paramMap.get('controlPanelID');
    console.log(certficateID, panelID);
    this.getServiceCardPanelData(certficateID, panelID);
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.role = user?.role_id;
      console.log('Role ID: ' + this.role);
    });
  }

  getServiceCardPanelData(certficateID, panelID) {
    this.http.get(this.url + 'sp-get-sc-panel-data.php?certID=' + certficateID + '&panelID=' + panelID).subscribe((data: any) => {
      console.log(data);
      this.cert = data?.certificate;
      this.site = data?.site;
      this.panel = data?.panels;
      this.summary = data?.summary;
      this.vents = data?.lists.vCheck;
      this.fans = data?.lists.fanCheck;
      this.actuators = data?.lists.actCheck;
      this.curtains = data?.lists.curtainCheck;
    });
  }

  ngOnInit() {
  }

}
