import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fans-checklist',
  templateUrl: './fans-checklist.page.html',
  styleUrls: ['./fans-checklist.page.scss'],
})
export class FansChecklistPage implements OnInit {
  certID: any;
  panelID: any;
  fanID: any;
  checklist: any;
  fan: any;
  url = environment.url;
  role: any;
  // ventID/:panelID/:certID',
  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage,
    private activatedRoute: ActivatedRoute
  ) {
    const fanID = this.activatedRoute.snapshot.paramMap.get('fanID');
    const panelID = this.activatedRoute.snapshot.paramMap.get('panelID');
    const certID = this.activatedRoute.snapshot.paramMap.get('certID');
    console.log(fanID,panelID,certID);
    this.getFanChecklist(fanID, panelID, certID);
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

  getFanChecklist(fID, pID, certID) {
    this.http.get(this.url + 'get-fan-checklist.php?fanID=' + fID + '&panelID=' + pID + '&certID=' + certID)
    .subscribe((check: any) => {
      console.log(check);
      this.checklist = check?.checklist;
      this.fan = check?.fan;
    });
  }

}
