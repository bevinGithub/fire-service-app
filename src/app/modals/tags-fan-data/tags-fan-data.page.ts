import { Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@awesome-cordova-plugins/nfc/ngx';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tags-fan-data',
  templateUrl: './tags-fan-data.page.html',
  styleUrls: ['./tags-fan-data.page.scss'],
})
export class TagsFanDataPage implements OnInit {
  siteID;
  fanNumber;
  fanCode;
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
