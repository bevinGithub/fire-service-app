import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tags-actuator-data',
  templateUrl: './tags-actuator-data.page.html',
  styleUrls: ['./tags-actuator-data.page.scss'],
})
export class TagsActuatorDataPage implements OnInit {
  siteID;
  actuatorNumber;
  actuatorCode;
  location;
  tagDate;
  serviceID;
  serviceTypeID;
  constructor(
    public  nfc: NFC,
    public  ndef: Ndef,
    private modalController: ModalController
  ) {

   }

  ngOnInit() {
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
