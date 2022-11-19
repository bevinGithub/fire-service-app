import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkCheckerService {
  public networkStatus: any;
  watchStatus: any;
  networkType: any;
  disconnectSubscription: any;
  connectSubscription: any;
  public isOffline: any;

  constructor(
    private network: Network,
    private alertController: AlertController,
    private toastController: ToastController
  ) {

  }

  checkNetworkChange(){
    this.disconnectSubscription = this.network.onDisconnect().subscribe((offline: any) => {
      console.log('network Disconnected: ');
      console.log(offline.type);
      this.networkStatus = offline.status;
    });
    this.connectSubscription = this.network.onConnect().subscribe((online: any) => {
      console.log('Network Connected: ');
      console.log(online.type);
      this.networkStatus = online.status;

    });

    this.watchStatus = this.network.onChange().subscribe((res: any) => {
      console.log('IsConnected: ' + this.network.type);
      this.networkAlert('You Are Now: ' + JSON.stringify(res));
      this.isOffline = this.network.type;
    });
  }

  public isConnected(): string {
    return this.isOffline;
  }

  public connectionType(): string {
    return this.network.type;
  }

  public getNetworkStatus(): string {
    return this.network.type;
  }



  async notifyAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Network Status',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async networkAlert(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'middle',
    });
    toast.present();
  }


}
