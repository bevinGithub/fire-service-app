import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tags-data',
  templateUrl: './tags-data.page.html',
  styleUrls: ['./tags-data.page.scss'],
})
export class TagsDataPage implements OnInit {
  siteID;
  tagNumber;
  deviceNumber;
  deviceType;
  tagZone;
  tagMessage;
  tagDate;
  serviceID;
  serviceTypeID;
  referenceNumber;
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
