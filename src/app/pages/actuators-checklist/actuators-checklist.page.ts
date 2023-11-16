import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-actuators-checklist',
  templateUrl: './actuators-checklist.page.html',
  styleUrls: ['./actuators-checklist.page.scss'],
})
export class ActuatorsChecklistPage implements OnInit {
  certID: any;
  panelID: any;
  actuatorID: any;
  checklist: any;
  actuator: any;
  url = environment.url;
  role: any;
  // ventID/:panelID/:certID',
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    const actuatorID = this.activatedRoute.snapshot.paramMap.get('actuatorID');
    const panelID = this.activatedRoute.snapshot.paramMap.get('panelID');
    const certID = this.activatedRoute.snapshot.paramMap.get('certID');
    console.log(actuatorID,panelID,certID);
    this.getFanChecklist(actuatorID, panelID, certID);
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('currentUser').then((user: any) => {
      console.log(user);
      this.role = user?.role_id;
      console.log('Role ID: ' + this.role);
    });
  }

  getFanChecklist(aID, pID, certID) {
    this.http.get(this.url + 'get-actuator-checklist.php?actuatorID=' + aID + '&panelID=' + pID + '&certID=' + certID)
    .subscribe((check: any) => {
      console.log(check);
      this.checklist = check?.checklist;
      this.actuator = check?.actuator;
    });
  }

}
