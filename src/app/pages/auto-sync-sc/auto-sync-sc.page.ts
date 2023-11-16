import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NetworkCheckerService } from 'src/app/services/network-checker.service';
import * as moment from 'moment';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auto-sync-sc',
  templateUrl: './auto-sync-sc.page.html',
  styleUrls: ['./auto-sync-sc.page.scss'],
})
export class AutoSyncSCPage implements OnInit {
  url = environment.url;
  networkStatus: any;
  database: SQLiteObject;
  userID: any;
  services: any;

  panels: any;
  templates: any;
  updateC: any;
  address: any;
  location: any;
  queryP: any;
  panelD1: any;
  panelD2: any;
  panelD3: any;
  panelD4: any;
  panelD5: any;
  panelD6: any;
  panelD7: any;
  panelD8: any;
  panelD9: any;
  panelD10: any;

  cleanDevice1: any;
  cleanDevice2: any;
  cleanDevice3: any;
  cleanDevice4: any;
  cleanDevice5: any;
  cleanDevice6: any;
  cleanDevice7: any;
  cleanDevice8: any;
  cleanDevice9: any;
  cleanDevice10: any;

  testSingleKnock1: any;
  testSingleKnock2: any;
  testSingleKnock3: any;
  testSingleKnock4: any;
  testSingleKnock5: any;
  testSingleKnock6: any;
  testSingleKnock7: any;
  testSingleKnock8: any;
  testSingleKnock9: any;
  testSingleKnock10: any;

  testSounderKnock1: any;
  testSounderKnock2: any;
  testSounderKnock3: any;
  testSounderKnock4: any;
  testSounderKnock5: any;
  testSounderKnock6: any;
  testSounderKnock7: any;
  testSounderKnock8: any;
  testSounderKnock9: any;
  testSounderKnock10: any;
  wireless: any[]=[];

  certificatesArray: any[]=[];
  constructor(
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private sqlite: SQLite,
    private networkCheckerService: NetworkCheckerService,
    private openNativeSettings: OpenNativeSettings,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.sqlite.create({
      name: 'fireservices.db',
      location: 'default',
    }).then((db: SQLiteObject) => {
      this.database = db;
    });
    this.networkCheckerService.checkNetworkChange();
    this.networkStatus = this.networkCheckerService.connectionType();
    this.flashMessage('Condition: ' + this.networkStatus);
    if (this.networkStatus !== 'none' || this.networkStatus !== undefined) {
      console.log('We in here: ' + this.networkStatus);
      this.storage.get('currentUser').then((user: any) => {
        //this.getOfflineCardsTest(user?.id);
        this.getOfflineCards(user?.id);
      });
    }
  }

  // getOfflineCardsTest(techID) {
  //   this.flashMessage('Tech ID: ' + techID);
  //   const offlineData = [];
  //   const isSync = 'No';
  //   const status = 'Completed';
  //   // eslint-disable-next-line max-len
  //   const querySC = 'SELECT *, cert_id as id FROM fire_sp_service_certificates WHERE service_technician_id=?';
  //   this.database.executeSql(querySC,[techID]).then((rec: any) => {
  //     if (rec.rows.length > 0) {
  //       for(let i=0; i < rec.rows.length; i++) {
  //         offlineData.push(rec.rows.item(i));
  //         this.certificatesArray.push(rec.rows.item(i));
  //       }
  //       alert(JSON.stringify(this.certificatesArray));
  //       // eslint-disable-next-line @typescript-eslint/prefer-for-of
  //       for(let i=0; i < this.certificatesArray.length; i++) {
  //         alert(JSON.stringify(this.certificatesArray[i]));
  //         this.processSyncTest(this.certificatesArray[i]);
  //       }
  //     } else {
  //       console.log('No records');
  //     }
  //   });
  // }

  // async processSyncTest(data: any) {
  //   const loading = await this.loadingController.create({
  //     message: 'Please wait...'
  //   });
  //   loading.present();
  //   this.storage.get('currentUser').then((user: any) => {
  //     const cert = data;
  //     //LOGBOOK
  //     const logSql = 'SELECT * FROM fire_logbook WHERE service_cert_id=?';
  //     this.database.executeSql(logSql, [cert?.id]).then((logBook: any) => {
  //       console.log('LogBook' + logBook);
  //       if (logBook.rows.length > 0) {
  //         const logData = logBook.rows.item(0);
  //         alert(JSON.stringify(logData));
  //       }
  //     }, err => {
  //       console.log('Error: ' + JSON.stringify(err));
  //     });

  //     // POINT 2.1 CALL POINTS
  //     const callSql = 'SELECT * FROM fire_manual_call_points WHERE service_cert_id=?';
  //     this.database.executeSql(callSql, [cert?.id]).then((callPoint: any) => {
  //       if (callPoint.rows.length > 0) {
  //         const callData = callPoint.rows.item(0);
  //         alert(JSON.stringify(callData));
  //       }
  //     }, err => {
  //       console.log('2.1 Error: ' + JSON.stringify(err));
  //     });
  //   });
  //   loading.dismiss();
  // }

  getOfflineCards(techID) {
    const offlineData = [];
    const isSync = 'No';
    const certStatus = 'Completed';
    // eslint-disable-next-line max-len
    const querySC = 'SELECT *, cert_id as id FROM fire_sp_service_certificates WHERE service_technician_id=? AND isSync=? AND service_status=?';
    this.database.executeSql(querySC,[techID,isSync,certStatus]).then((rec: any) => {
      if (rec.rows.length > 0) {
        for(let i=0; i < rec.rows.length; i++) {
          offlineData.push(rec.rows.item(i));
          this.certificatesArray.push(rec.rows.item(i));
        }
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for(let c=0; c < this.certificatesArray.length; c++) {
          this.processSync(this.certificatesArray[c]);
        }
      } else {
        this.flashMessage('There are no service certificates to sync!');
      }
    });
  }

  async flashMessage(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  async processSync(data: any) {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    loading.present();
    this.storage.get('currentUser').then((user: any) => {
      const cert = data;
      //LOGBOOK
      const logSql = 'SELECT * FROM fire_logbook WHERE service_cert_id=?';
      this.database.executeSql(logSql, [cert?.id]).then((logBook: any) => {
        if (logBook.rows.length > 0) {
          const logData = logBook.rows.item(0);
          const isSync = 'Yes';
            this.database.executeSql(`UPDATE fire_logbook SET isSync=?, tech_id=? WHERE id=${logData?.id}`, [isSync, user?.id])
          .then((update: any) => {
            this.http.post(this.url + 'sync-logbook.php', logData).subscribe((logSync: any) => {
              console.log('Logbook Sync Status: ' + JSON.stringify(logSync));
            });
          }, err => {
            console.log('Query Update error: ' + JSON.stringify(err));
          });
        }
      }, err => {
        console.log('Error: ' + JSON.stringify(err));
      });

      // POINT 2.1 CALL POINTS
      const callSql = 'SELECT * FROM fire_manual_call_points WHERE service_cert_id=?';
      this.database.executeSql(callSql, [cert?.id]).then((callPoint: any) => {
        if (callPoint.rows.length > 0) {
          const callData = callPoint.rows.item(0);
          const isSync = 'Yes';
          // eslint-disable-next-line max-len
            this.database.executeSql(`UPDATE fire_manual_call_points SET isSync=?, tech_id=? WHERE id=${callData?.id}`, [isSync, user?.id])
          .then((update: any) => {
            this.http.post(this.url + 'sync-callpoint.php', callData).subscribe((callSync: any) => {
              console.log('Call Point Sync Status: ' + JSON.stringify(callSync));
            });
          }, err => {
            console.log('Query Update error: ' + JSON.stringify(err));
          });
        }
      }, err => {
        console.log('2.1 Error: ' + JSON.stringify(err));
      });

      // POINT 2.2 BUILDING STRUCTURES
      const structSql = 'SELECT * FROM fire_building_structures WHERE service_cert_id=?';
      this.database.executeSql(structSql, [cert?.id]).then((structData: any) => {
        if (structData.rows.length > 0) {
          const structureData = structData.rows.item(0);
          const isSync = 'Yes';
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_building_structures SET isSync=?, tech_id=? WHERE id=${structureData?.id}`, [isSync, user?.id])
          .then((updateStruct: any) => {
            this.http.post(this.url + 'sync-building-structure.php', structureData).subscribe((structSync: any) => {
              console.log('Building Structure Sync Status: ' + JSON.stringify(structSync));
            });
          }, err => {
            console.log('Building Structure Update error: ' + JSON.stringify(err));
          });
        }
      }, err => {
          console.log('2.2 Error: ' + JSON.stringify(err));
      });

      // POINT 6.1 BEAM DETECTION
      const beamSql = 'SELECT * FROM fire_beam_detection_template WHERE service_cert_id=?';
      this.database.executeSql(beamSql, [cert?.id]).then((resBeam: any) => {
        if(resBeam.rows.length > 0) {
          const beamData = resBeam.rows.item(0);
          const bId = beamData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_beam_detection_template SET isSync=? AND tech_id=? WHERE id=${bId}`, [isSync, user?.id])
          .then((beamSync: any) => {
            console.log('Updated: ' + JSON.stringify(beamSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-beam-detection.php', beamData).subscribe((beamSyncRes: any) => {
              console.log('Beam Detection Sync Status: ' + JSON.stringify(beamSyncRes));
            });
          });
        }
      });

      // POINT 6.2 AIR SAMPLING
      const airSql = 'SELECT * FROM fire_air_sampling_template WHERE service_cert_id=?';
      this.database.executeSql(airSql, [cert?.id]).then((resAir: any) => {
        if(resAir.rows.length > 0) {
          const airData = resAir.rows.item(0);
          const airId = airData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_air_sampling_template SET isSync=? AND tech_id=? WHERE id=${airId}`, [isSync, user?.id])
          .then((airSync: any) => {
            console.log('Updated: ' + JSON.stringify(airSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-air-sampling.php', airData).subscribe((airSyncRes: any) => {
              console.log('Air Sampling Sync Status: ' + JSON.stringify(airSyncRes));
            });
          });
        }
      });

      // POINT 6.3 LINER HEAT
      const linerSql = 'SELECT * FROM fire_liner_heat WHERE service_cert_id=?';
      this.database.executeSql(linerSql, [cert?.id]).then((resLiner: any) => {
        if(resLiner.rows.length > 0) {
          const linerData = resLiner.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_liner_heat SET isSync=? AND tech_id=? WHERE id=${linerData?.id}`, [isSync, user?.id])
          .then((linerSync: any) => {
            console.log('Updated: ' + JSON.stringify(linerSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-liner-heat.php', linerData).subscribe((linerSyncRes: any) => {
              console.log('Liner Heat Sync Status: ' + JSON.stringify(linerSyncRes));
            });
          });
        }
      });

      // POINT 6.4 FLAME DETECTION
      const flameSql = 'SELECT * FROM fire_flame_detection WHERE service_cert_id=?';
      this.database.executeSql(flameSql, [cert?.id]).then((resFlame: any) => {
        if(resFlame.rows.length > 0) {
          const flameData = resFlame.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_flame_detection SET isSync=? AND tech_id=? WHERE id=${flameData?.id}`, [isSync, user?.id])
          .then((linerSync: any) => {
            console.log('Updated: ' + JSON.stringify(linerSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-flame-detection.php', flameData).subscribe((flameSyncRes: any) => {
              console.log('Flame Detection Sync Status: ' + JSON.stringify(flameSyncRes));
            });
          });
        }
      });

      // POINT 6.5 WIRELESS
      // eslint-disable-next-line max-len
      this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_wireless WHERE service_type_id=? AND site_id=?`, [cert?.service_type_id, cert?.site_id])
      .then((res: any) => {
        console.log('Result: ' + JSON.stringify(res));
        if (res.rows.length > 0) {
          for(let i=0; i < res.rows.length; i++) {
            this.wireless.push(res.rows.item(i));
          }
          // eslint-disable-next-line @typescript-eslint/prefer-for-of
          for(let i=0; i < this.wireless.length; i++) {
            const id = this.wireless[i]?.id;
            const isSync = 'Yes';
            // eslint-disable-next-line max-len
            this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_wireless SET isSync=? WHERE id=${id}`, [isSync]).then((updateWireless: any) => {
              console.log(updateWireless);
              // update online
              this.http.post(this.url + 'sync-wireless.php', this.wireless[i]).subscribe((resWireless: any) => {
                console.log(resWireless);
              });
            }, err => {
              console.log('Wireless ERROR: ' + JSON.stringify(err));
            });
          }
        }
      }, err => {
        console.log('Select Error: ' + JSON.stringify(err));
      });

      // POINT 8.0 MONITORING
      const monSql = 'SELECT * FROM fire_monitoring WHERE service_cert_id=?';
      this.database.executeSql(monSql, [cert?.id]).then((resMonitor: any) => {
        if(resMonitor.rows.length > 0) {
          const monitorData = resMonitor.rows.item(0);
          const isSync = 'Yes';
          // eslint-disable-next-line max-len
          this.database.executeSql(`UPDATE fire_monitoring SET isSync=? AND tech_id=? WHERE id=${monitorData?.id}`, [isSync, user?.id]).then((monSync: any) => {
            console.log('Updated: ' + JSON.stringify(monSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-monitoring.php', monitorData).subscribe((monSyncRes: any) => {
              console.log('Monitoring Sync Status: ' + JSON.stringify(monSyncRes));
            });
          });
        }
      });

      // POINT 9.1 SINGLE KNOCK
      const singleKnockSql = 'SELECT * FROM fire_single_knock WHERE service_cert_id=?';
      this.database.executeSql(singleKnockSql, [cert?.id]).then((resSingle: any) => {
        if(resSingle.rows.length > 0) {
          const singleData = resSingle.rows.item(0);
          const sId = singleData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_single_knock SET isSync=? AND tech_id=? WHERE id=${sId}`, [isSync, user?.id])
          .then((singleSync: any) => {
            console.log('Updated: ' + JSON.stringify(singleSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-single-knock.php', singleData).subscribe((singleSyncRes: any) => {
              console.log('Single Knock Sync Status: ' + JSON.stringify(singleSyncRes));
            });
          });
        }
      });

      // POINT 9.2 DOUBLE KNOCK
      const doubleKnockSql = 'SELECT * FROM fire_double_knock WHERE service_cert_id=?';
      this.database.executeSql(doubleKnockSql, [cert?.id]).then((resDouble: any) => {
        if(resDouble.rows.length > 0) {
          const doubleData = resDouble.rows.item(0);
          const dId = doubleData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_double_knock SET isSync=? AND tech_id=? WHERE id=${dId}`, [isSync, user?.id])
          .then((doubleSync: any) => {
            console.log('Updated: ' + JSON.stringify(doubleSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-double-knock.php', doubleData).subscribe((singleSyncRes: any) => {
              console.log('Double Knock Sync Status: ' + JSON.stringify(singleSyncRes));
            });
          });
        }
      });

      // POINT 9.3 FIRE BELLS
      const bellsSql = 'SELECT * FROM fire_bells WHERE service_cert_id=?';
      this.database.executeSql(bellsSql, [cert?.id]).then((resBells: any) => {
        if(resBells.rows.length > 0) {
          const bellsData = resBells.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_bells SET isSync=? AND tech_id=? WHERE id=${bellsData?.id}`, [isSync, user?.id])
          .then((bellsSync: any) => {
            console.log('Updated: ' + JSON.stringify(bellsSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-fire-bells.php', bellsData).subscribe((bellsSyncRes: any) => {
              console.log('Fire bells Sync Status: ' + JSON.stringify(bellsSyncRes));
            });
          });
        }
      });

      // POINT 9.4 SOUNDERS FUNCTIONAL
      const sounderSql = 'SELECT * FROM fire_sounders_functional WHERE service_cert_id=?';
      this.database.executeSql(sounderSql, [cert?.id]).then((resSounders: any) => {
        if(resSounders.rows.length > 0) {
          const soundersData = resSounders.rows.item(0);
          const sID = soundersData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_sounders_functional SET isSync=? AND tech_id=? WHERE id=${sID}`, [isSync, user?.id])
          .then((bellsSync: any) => {
            console.log('Updated: ' + JSON.stringify(bellsSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-sounders-functional.php', soundersData).subscribe((sounderSyncRes: any) => {
              console.log('Sounders Functional Sync Status: ' + JSON.stringify(sounderSyncRes));
            });
          });
        }
      });

      // POINT 9.5 STROBES FUNCTIONAL
      const strobeSql = 'SELECT * FROM fire_strobes_functional WHERE service_cert_id=?';
      this.database.executeSql(strobeSql, [cert?.id]).then((resStrobes: any) => {
        if(resStrobes.rows.length > 0) {
          const strobesData = resStrobes.rows.item(0);
          const stID = strobesData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_strobes_functional SET isSync=? AND tech_id=? WHERE id=${stID}`, [isSync, user?.id])
          .then((strobesSync: any) => {
            console.log('Updated: ' + JSON.stringify(strobesSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-strobes-functional.php', strobesData).subscribe((strobesSyncRes: any) => {
              console.log('Strobes Functional Sync Status: ' + JSON.stringify(strobesSyncRes));
            });
          });
        }
      });

      // POINT 9.6 SUPPRESSION DETONATORS
      const supDetoSql = 'SELECT * FROM fire_suppression_detonators WHERE service_cert_id=?';
      this.database.executeSql(supDetoSql, [cert?.id]).then((resDetonators: any) => {
        if(resDetonators.rows.length > 0) {
          const detonatorsData = resDetonators.rows.item(0);
          const dID = detonatorsData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_suppression_detonators SET isSync=? AND tech_id=? WHERE id=${dID}`, [isSync, user?.id])
          .then((detonatorsSync: any) => {
            console.log('Updated: ' + JSON.stringify(detonatorsSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-suppression-detonators.php', detonatorsData).subscribe((detonatorsSyncRes: any) => {
              console.log('Detonators Sync Status: ' + JSON.stringify(detonatorsSyncRes));
            });
          });
        }
      });

      // POINT 9.7 DOOR MONITORS
      const doorMonSql = 'SELECT * FROM fire_door_monitor_functional WHERE service_cert_id=?';
      this.database.executeSql(doorMonSql, [cert?.id]).then((resDoorMon: any) => {
        if(resDoorMon.rows.length > 0) {
          const doorMonData = resDoorMon.rows.item(0);
          const dID = doorMonData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_door_monitor_functional SET isSync=? AND tech_id=? whERE id=${dID}`, [isSync, user?.id])
          .then((doorMonSync: any) => {
            console.log('Updated: ' + JSON.stringify(doorMonSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-door-monitor.php', doorMonData).subscribe((doorMonSyncRes: any) => {
              console.log('Detonators Sync Status: ' + JSON.stringify(doorMonSyncRes));
            });
          });
        }
      });

      // POINT 9.8 SUPPRESSION CYLINDERS
      const cyliderSql = 'SELECT * FROM fire_suppression_cylinder WHERE service_cert_id=?';
      this.database.executeSql(cyliderSql, [cert?.id]).then((resCylinder: any) => {
        if(resCylinder.rows.length > 0) {
          const cylinderData = resCylinder.rows.item(0);
          const cID = cylinderData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_suppression_cylinder SET isSync=? AND tech_id=? WHERE id=${cID}`, [isSync, user?.id])
          .then((cylinderSync: any) => {
            console.log('Updated: ' + JSON.stringify(cylinderSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-sup-cylinders.php', cylinderData).subscribe((cylinderSyncRes: any) => {
              console.log('Detonators Sync Status: ' + JSON.stringify(cylinderSyncRes));
            });
          });
        }
      });

      // POINT 9.9 AUTO MANUAL SWITCH
      const autoManualSql = 'SELECT * FROM fire_suppression_cylinder WHERE service_cert_id=?';
      this.database.executeSql(autoManualSql, [cert?.id]).then((resAutoManual: any) => {
        if(resAutoManual.rows.length > 0) {
          const autoManualData = resAutoManual.rows.item(0);
          const aID = autoManualData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_suppression_cylinder SET isSync=? AND tech_id=? WHERE id=${aID}`, [isSync, user?.id])
          .then((autoSync: any) => {
            console.log('Updated: ' + JSON.stringify(autoSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-auto-manual-switch.php', autoManualData).subscribe((autoSyncRes: any) => {
              console.log('Auto Manual Sync Status: ' + JSON.stringify(autoSyncRes));
            });
          });
        }
      });

      // POINT 7.1 STAIR PRESSURE FANS
      const stairFansSql = 'SELECT * FROM fire_stair_pressure_fans WHERE service_cert_id=?';
      this.database.executeSql(stairFansSql, [cert?.id]).then((resStairFans: any) => {
        if(resStairFans.rows.length > 0) {
          const fansData = resStairFans.rows.item(0);
          const fID = fansData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_stair_pressure_fans SET isSync=? AND tech_id=? WHERE id=${fID}`, [isSync, user?.id])
          .then((fansSync: any) => {
            console.log('Updated: ' + JSON.stringify(fansSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-stair-pressure-fans.php', fansData).subscribe((stairFansSyncRes: any) => {
              console.log('Stair Pressure Fans Sync Status: ' + JSON.stringify(stairFansSyncRes));
            });
          });
        }
      });

      // POINT 7.2 Lift PRESSURE FANS * update database from here
      const liftFansSql = 'SELECT * FROM fire_lift_pressure_fans WHERE service_cert_id=?';
      this.database.executeSql(liftFansSql, [cert?.id]).then((resLiftFans: any) => {
        if(resLiftFans.rows.length > 0) {
          const liftFansData = resLiftFans.rows.item(0);
          const lID = liftFansData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_lift_pressure_fans SET isSync=? AND tech_id=? WHERE id=${lID}`, [isSync, user?.id])
          .then((liftFansSync: any) => {
            console.log('Updated: ' + JSON.stringify(liftFansSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-lift-pressure-fans.php', liftFansData).subscribe((liftFansSyncRes: any) => {
              console.log('Stair Pressure Fans Sync Status: ' + JSON.stringify(liftFansSyncRes));
            });
          });
        }
      });

      // POINT 7.3 SMOKE EXTRATCTION
      const smokeExtSql = 'SELECT * FROM fire_smoke_extraction_fans WHERE service_cert_id=?';
      this.database.executeSql(smokeExtSql, [cert?.id]).then((resSmoke: any) => {
        if(resSmoke.rows.length > 0) {
          const smokeExtractionData = resSmoke.rows.item(0);
          const sID = smokeExtractionData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_smoke_extraction_fans SET isSync=? AND tech_id=? WHERE id=${sID}`, [isSync, user?.id])
          .then((smokeSync: any) => {
            console.log('Updated: ' + JSON.stringify(smokeSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-smoke-extraction-fans.php', smokeExtractionData).subscribe((smokeSyncRes: any) => {
              console.log('Smoke Extraction Sync Status: ' + JSON.stringify(smokeSyncRes));
            });
          });
        }
      });

      // POINT 7.4 SMOKE VENILTION
      const smokeVentSql = 'SELECT * FROM fire_smoke_ventilation_louvers WHERE service_cert_id=?';
      this.database.executeSql(smokeVentSql, [cert?.id]).then((resSmokeVent: any) => {
        if(resSmokeVent.rows.length > 0) {
          const smokeVentData = resSmokeVent.rows.item(0);
          const vID = smokeVentData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_smoke_ventilation_louvers SET isSync=? AND tech_id=? WHERE id=${vID}`, [isSync, user?.id])
          .then((ventSync: any) => {
            console.log('Updated: ' + JSON.stringify(ventSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-smoke-ventilation.php', smokeVentData).subscribe((ventSyncRes: any) => {
              console.log('Smoke Vemtilation Sync Status: ' + JSON.stringify(ventSyncRes));
            });
          });
        }
      });

      // POINT 7.5 ROLLER SHUTTER
      const rollerShutterSql = 'SELECT * FROM fire_roller_shutter_doors WHERE service_cert_id=?';
      this.database.executeSql(rollerShutterSql, [cert?.id]).then((resShutter: any) => {
        if(resShutter.rows.length > 0) {
          const rollerShutterData = resShutter.rows.item(0);
          const rollID = rollerShutterData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_roller_shutter_doors SET isSync=? AND tech_id=? WHERE id=${rollID}`, [isSync, user?.id])
          .then((shutterSync: any) => {
            console.log('Updated: ' + JSON.stringify(shutterSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-roller-shutter.php', rollerShutterData).subscribe((rollerSyncRes: any) => {
              console.log('Roller Shutter Sync Status: ' + JSON.stringify(rollerSyncRes));
            });
          });
        }
      });

      // POINT 7.6 DOOR HOLDS DEVICES
      const doorHoldSql = 'SELECT * FROM fire_door_hold_devices WHERE service_cert_id=?';
      this.database.executeSql(doorHoldSql, [cert?.id]).then((resHold: any) => {
        if(resHold.rows.length > 0) {
          const doorHoldData = resHold.rows.item(0);
          const dID = doorHoldData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_door_hold_devices SET isSync=? AND tech_id=? WHERE id=${dID}`, [isSync, user?.id])
          .then((doorSync: any) => {
            console.log('Updated: ' + JSON.stringify(doorSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-door-holds.php', doorHoldData).subscribe((doorHoldSyncRes: any) => {
              console.log('Door Holds Sync Status: ' + JSON.stringify(doorHoldSyncRes));
            });
          });
        }
      });

      // POINT 7.7 ESCAPE DOOR RELEASE
      const escapeDoorSql = 'SELECT * FROM fire_escape_doors_release WHERE service_cert_id=?';
      this.database.executeSql(escapeDoorSql, [cert?.id]).then((resEscape: any) => {
        if(resEscape.rows.length > 0) {
          const escapeDoorsData = resEscape.rows.item(0);
          const escID = escapeDoorsData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_escape_doors_release SET isSync=? AND tech_id=? WHERE id=${escID}`, [isSync, user?.id])
          .then((doorsSync: any) => {
            console.log('Updated: ' + JSON.stringify(doorsSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-escape-doors.php', escapeDoorsData).subscribe((escapeSyncRes: any) => {
              console.log('Escape Doors Sync Status: ' + JSON.stringify(escapeSyncRes));
            });
          });
        }
      });

      // POINT 7.8 AUTO EVACUATION
      const autoEvacSql = 'SELECT * FROM fire_auto_evacuation WHERE service_cert_id=?';
      this.database.executeSql(autoEvacSql, [cert?.id]).then((resEvac: any) => {
        if(resEvac.rows.length > 0) {
          const evacuationData = resEvac.rows.item(0);
          const evacID = evacuationData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_auto_evacuation SET isSync=? AND tech_id=? WHERE id=${evacID}`, [isSync, user?.id])
          .then((evacSync: any) => {
            console.log('Updated: ' + JSON.stringify(evacSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-auto-evacuation.php', evacuationData).subscribe((evacSyncRes: any) => {
              console.log('Auto Evacuation Sync Status: ' + JSON.stringify(evacSyncRes));
            });
          });
        }
      });

      // POINT 7.9 REMOTE SIGNAL
      const signalSql = 'SELECT * FROM fire_auto_remote_signal WHERE service_cert_id=?';
      this.database.executeSql(signalSql, [cert?.id]).then((resSignal: any) => {
        if(resSignal.rows.length > 0) {
          const remoteSignalData = resSignal.rows.item(0);
          const remID = remoteSignalData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_auto_remote_signal SET isSync=? AND tech_id=? WHERE id=${remID}`, [isSync, user?.id])
          .then((signalSync: any) => {
            console.log('Updated: ' + JSON.stringify(signalSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-remote-signal.php', remoteSignalData).subscribe((evacSyncRes: any) => {
              console.log('Remote Signal Sync Status: ' + JSON.stringify(evacSyncRes));
            });
          });
        }
      });

      // POINT 7.10 GAS SHUT VALVES
      const gasSql = 'SELECT * FROM fire_gas_shut_valves WHERE service_cert_id=?';
      this.database.executeSql(gasSql, [cert?.id]).then((resGas: any) => {
        if(resGas.rows.length > 0) {
          const gasData = resGas.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_gas_shut_valves SET isSync=? AND tech_id=? WHERE id=${gasData?.id}`, [isSync, user?.id])
          .then((signalSync: any) => {
            console.log('Updated: ' + JSON.stringify(signalSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-gas-shut-vales.php', gasData).subscribe((gasSyncRes: any) => {
              console.log('Gas Shut Valves Sync Status: ' + JSON.stringify(gasSyncRes));
            });
          });
        }
      });

      // POINT 7.11 COOKER HEAD
      const cookerSql = 'SELECT * FROM fire_cooker_head_suppression WHERE service_cert_id=?';
      this.database.executeSql(cookerSql, [cert?.id]).then((resCooker: any) => {
        if(resCooker.rows.length > 0) {
          const cookerData = resCooker.rows.item(0);
          const cID = cookerData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_cooker_head_suppression SET isSync=? AND tech_id=? WHERE id=${cID}`, [isSync, user?.id])
          .then((cookerSync: any) => {
            console.log('Updated: ' + JSON.stringify(cookerSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-cooker-head.php', cookerData).subscribe((cookerSyncRes: any) => {
              console.log('Cooker Head Sync Status: ' + JSON.stringify(cookerSyncRes));
            });
          });
        }
      });

      // POINT 7.12 LIFT HOMING
      const liftSql = 'SELECT * FROM fire_lift_homing WHERE service_cert_id=?';
      this.database.executeSql(liftSql, [cert?.id]).then((resLift: any) => {
        if(resLift.rows.length > 0) {
          const liftData = resLift.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_lift_homing SET isSync=? AND tech_id=? WHERE id=${liftData?.id}`, [isSync, user?.id])
          .then((liftSync: any) => {
            console.log('Updated: ' + JSON.stringify(liftSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-lift-homing.php', liftData).subscribe((liftSyncRes: any) => {
              console.log('Lift Sync Status: ' + JSON.stringify(liftSyncRes));
            });
          });
        }
      });

      // POINT 7.13 AC SHUTDWON
      const acSql = 'SELECT * FROM fire_ac_shutdown WHERE service_cert_id=?';
      this.database.executeSql(acSql, [cert?.id]).then((resAC: any) => {
        if(resAC.rows.length > 0) {
          const acData = resAC.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_ac_shutdown SET isSync=? AND tech_id=? WHERE id=${acData?.id}`, [isSync, user?.id])
          .then((acSync: any) => {
            console.log('Updated: ' + JSON.stringify(acSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-ac-shutdown.php', acData).subscribe((acSyncRes: any) => {
              console.log('AC SHUTDOWN Sync Status: ' + JSON.stringify(acSyncRes));
            });
          });
        }
      });

      // POINT 7.14 FRESH AIR SHUTDWON
      const freshAirSql = 'SELECT * FROM fire_fresh_air_shutdown WHERE service_cert_id=?';
      this.database.executeSql(freshAirSql, [cert?.id]).then((resAir: any) => {
        if(resAir.rows.length > 0) {
          const freshAirData = resAir.rows.item(0);
          const fID = freshAirData?.id;
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_fresh_air_shutdown SET isSync=? AND tech_id=? WHERE id=${fID}`, [isSync, user?.id])
          .then((freshSync: any) => {
            console.log('Updated: ' + JSON.stringify(freshSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-fresh-air-shutdown.php', freshAirData).subscribe((freshSyncRes: any) => {
              console.log('FRESH AIR SHUTDOWN Sync Status: ' + JSON.stringify(freshSyncRes));
            });
          });
        }
      });

      // POINT 7.15 OTHER
      const otherSql = 'SELECT * FROM fire_other_15 WHERE service_cert_id=?';
      this.database.executeSql(otherSql, [cert?.id]).then((resOther: any) => {
        if(resOther.rows.length > 0) {
          const otherData = resOther.rows.item(0);
          const isSync = 'Yes';
          this.database.executeSql(`UPDATE fire_other_15 SET isSync=? AND tech_id=? WHERE id=${otherData?.id}`, [isSync, user?.id])
          .then((otherSync: any) => {
            console.log('Updated: ' + JSON.stringify(otherSync));
            // POST ONLINE
            this.http.post(this.url + 'sync-other-15.php', otherData).subscribe((otherSyncRes: any) => {
              console.log('OTHER Sync Status: ' + JSON.stringify(otherSyncRes));
            });
          });
        }
      });

      // GET PANELS NUMBER ON CERTIFICATE
      const panelsSql = 'SELECT * FROM fire_sp_template_panels WHERE service_type_id=? AND site_id=?';
      this.database.executeSql(panelsSql, [cert.service_type_id, cert?.site_id]).then((panelsData: any) => {
        if (panelsData.rows.length > 0) {
          const panelsList = [];
          for (let i = 0; i < panelsData.rows.length; i++) {
            panelsList.push(panelsData.rows.item(i));
          }
          this.panels = panelsList;
        }
        if (this.panels[0] !== undefined) {
          // point 3.1
          const panel1Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=?';
          this.database.executeSql(panel1Sql, [cert?.id]).then((panel1Data: any) => {
            if (panel1Data.rows.length > 0) {
              const panel1Res = panel1Data.rows.item(0);
              console.log('Panel Data: ' + panel1Res);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel1Res?.id}`, [isSync, user?.id])
              .then((updatePanel1: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel1));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel1Res).subscribe((panel1Sync: any) => {
                  console.log('Preservice Check Panel 1 Sync Status: ' + JSON.stringify(panel1Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 1: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 1: ' + JSON.stringify(err));
              });
            } else {
              console.log('Empty Data------');
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.1
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[0]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice1 = devices;
              console.log('Devices List: ' + JSON.stringify(this.cleanDevice1));
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice1.length; i++) {
                const id = this.cleanDevice1[i]?.id;
                const isSync = 'Yes';
                const updateValues = [isSync];
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((updatePanel1: any) => {
                  console.log(updatePanel1);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice1[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('firesp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                });
              }
            } else {
              console.log('EMPTY DEVICES: Panel 1');
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.1 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[0]?.id])
          .then((res2: any) => {
            console.log('Result: ' + JSON.stringify(res2));
            if (res2.rows.length > 0) {
              const devicesSingle = [];
              for(let i=0; i < res2.rows.length; i++) {
                devicesSingle.push(res2.rows.item(i));
              }
              this.testSingleKnock1 = devicesSingle;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.testSingleKnock1.length; i++) {
                const id = this.testSingleKnock1[i]?.id;
                const isSync = 'Yes';
                const updateValues = [isSync];
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                  console.log(updateDevice);
                  // update online
                  this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock1[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.1 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[0]?.id])
          .then((res3: any) => {
            console.log('Result: ' + JSON.stringify(res3));
            if (res3.rows.length > 0) {
              const devicesSounder = [];
              for(let i=0; i < res3.rows.length; i++) {
                devicesSounder.push(res3.rows.item(i));
              }
              this.testSounderKnock1 = devicesSounder;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.testSounderKnock1.length; i++) {
                const id = this.testSounderKnock1[i]?.id;
                const isSync = 'Yes';
                // eslint-disable-next-line max-len
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                  console.log(updateSounder);
                  // update online
                  // eslint-disable-next-line max-len
                  this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock1[i]).subscribe((resSounder: any) => {
                    console.log(resSounder);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

        } // END PANEL 1

        // START PANEL 2
        if (this.panels[1] !== undefined) {
          console.log('Panel 2 -----');
          const panel2Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel2Sql, [cert?.id, this.panels[1]?.id]).then((panel2Data: any) => {
            if (panel2Data.rows.length > 0) {
              const panel2Res = panel2Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel2Res?.id}`, [isSync, user?.id])
              .then((updatePanel2: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel2));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel2Res).subscribe((panel2Sync: any) => {
                  console.log('Preservice Check Panel 2 Sync Status: ' + JSON.stringify(panel2Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 2: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 2: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.2
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[1]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice2 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice2.length; i++) {
                const id = this.cleanDevice2[i]?.id;
                const isSync = 'Yes';
                // eslint-disable-next-line max-len
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((updatePanel2: any) => {
                  console.log(updatePanel2);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice2[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.2 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[1]?.id])
          .then((res2: any) => {
            console.log('Result: ' + JSON.stringify(res2));
            if (res2.rows.length > 0) {
            const devicesSingle = [];
            for(let i=0; i < res2.rows.length; i++) {
              devicesSingle.push(res2.rows.item(i));
            }
            this.testSingleKnock2 = devicesSingle;
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let i=0; i < this.testSingleKnock2.length; i++) {
              const id = this.testSingleKnock2[i]?.id;
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              const updateValues = [isSync];
              console.log(updateValues);
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
              console.log(updateDevice);
              // update online
              this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock2[i]).subscribe((resCleanD: any) => {
                console.log(resCleanD);
              });
              }, err => {
              console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
              });
            }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.2 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[1]?.id])
          .then((res3: any) => {
            console.log('Result: ' + JSON.stringify(res3));
            if (res3.rows.length > 0) {
            const devicesSounder = [];
            for(let i=0; i < res3.rows.length; i++) {
              devicesSounder.push(res3.rows.item(i));
            }
            this.testSounderKnock2 = devicesSounder;
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let i=0; i < this.testSounderKnock2.length; i++) {
              const id = this.testSounderKnock2[i]?.id;
              const isSync = 'Yes';
              const updateValues = [isSync];
              console.log(updateValues);
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
              console.log(updateSounder);
              // update online
              // eslint-disable-next-line max-len
              this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock2[i]).subscribe((resSounder: any) => {
                console.log(resSounder);
              });
              }, err => {
              console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
              });
            }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

        }

        // END PANEL 2 START PANEL 3
        if (this.panels[2] !== undefined) {
          const panel3Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel3Sql, [cert?.id, this.panels[2]?.id]).then((panel3Data: any) => {
            if (panel3Data.rows.length > 0) {
              const panel3Res = panel3Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel3Res?.id}`, [isSync, user?.id])
              .then((updatePanel3: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel3));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel3Res).subscribe((panel3Sync: any) => {
                  console.log('Preservice Check Panel 3 Sync Status: ' + JSON.stringify(panel3Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 3: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 3: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.3
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[2]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice3 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice3.length; i++) {
                const id = this.cleanDevice3[i]?.id;
                const isSync = 'Yes';
                // eslint-disable-next-line max-len
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice3[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.3 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[2]?.id])
          .then((res2: any) => {
            console.log('Result: ' + JSON.stringify(res2));
            if (res2.rows.length > 0) {
            const devicesSingle = [];
            for(let i=0; i < res2.rows.length; i++) {
              devicesSingle.push(res2.rows.item(i));
            }
            this.testSingleKnock3 = devicesSingle;
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let i=0; i < this.testSingleKnock3.length; i++) {
              const id = this.testSingleKnock3[i].id;
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              const updateValues = [isSync];
              console.log(updateValues);
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
              console.log(updateDevice);
              // update online
              this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock3[i]).subscribe((resCleanD: any) => {
                console.log(resCleanD);
              });
              }, err => {
              console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
              });
            }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.3 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[2].id])
          .then((res3: any) => {
            console.log('Result: ' + JSON.stringify(res3));
            if (res3.rows.length > 0) {
            const devicesSounder = [];
            for(let i=0; i < res3.rows.length; i++) {
              devicesSounder.push(res3.rows.item(i));
            }
            this.testSounderKnock3 = devicesSounder;
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for(let i=0; i < this.testSounderKnock3.length; i++) {
              const id = this.testSounderKnock3[i].id;
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              const updateValues = [isSync];
              console.log(updateValues);
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
              console.log(updateSounder);
              // update online
              // eslint-disable-next-line max-len
              this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock3[i]).subscribe((resSounder: any) => {
                console.log(resSounder);
              });
              }, err => {
              console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
              });
            }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

        }

        // END PANEL 3 START PANEL 4
        if (this.panels[3] !== undefined) {
          const panel4Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel4Sql, [cert?.id, this.panels[3]?.id]).then((panel4Data: any) => {
            if (panel4Data.rows.length > 0) {
              const panel4Res = panel4Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel4Res?.id}`, [isSync, user?.id])
              .then((updatePanel4: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel4));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel4Res).subscribe((panel4Sync: any) => {
                  console.log('Preservice Check Panel 3 Sync Status: ' + JSON.stringify(panel4Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 4: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 4: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.4
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[3].id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice4 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice4.length; i++) {
                const id = this.cleanDevice4[i]?.id;
                const isSync = 'Yes';
                const updateValues = [isSync];
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice4[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.4 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[3]?.id])
            .then((res2: any) => {
              console.log('Result: ' + JSON.stringify(res2));
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock4 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock4.length; i++) {
                  const id = this.testSingleKnock4[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock4[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.4 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[3]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock4 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock4.length; i++) {
                  const id = this.testSounderKnock4[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // update online
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock4[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

        // END PANEL 4 START PANEL 5
        if (this.panels[4] !== undefined) {
          const panel5Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel5Sql, [cert?.id, this.panels[4]?.id]).then((panel5Data: any) => {
            if (panel5Data.rows.length > 0) {
              const panel5Res = panel5Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel5Res?.id}`, [isSync, user?.id])
              .then((updatePanel5: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel5));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel5Res).subscribe((panel5Sync: any) => {
                  console.log('Preservice Check Panel 5 Sync Status: ' + JSON.stringify(panel5Sync));
                }, err => {
                  console.log('3.5 Post Error Panel 5: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.5 Update Error Panel 5: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.5
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[4]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice5 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice5.length; i++) {
                const id = this.cleanDevice5[i]?.id;
                const isSync = 'Yes';
                // eslint-disable-next-line max-len
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice5[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.5 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[4]?.id])
            .then((res2: any) => {
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock5 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock5.length; i++) {
                  const id = this.testSingleKnock5[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock5[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.5 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[4]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock5 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock5.length; i++) {
                  const id = this.testSounderKnock5[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // update online
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock5[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

        // END PANEL 5 START PANEL 6
        if (this.panels[5] !== undefined) {
          const panel6Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel6Sql, [cert?.id, this.panels[5]?.id]).then((panel6Data: any) => {
            if (panel6Data.rows.length > 0) {
              const panel6Res = panel6Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel6Res?.id}`, [isSync, user?.id])
              .then((updatePanel6: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel6));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel6Res).subscribe((panel6Sync: any) => {
                  console.log('Preservice Check Panel 6 Sync Status: ' + JSON.stringify(panel6Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 6: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 6: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.6
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[5]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice6 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice6.length; i++) {
                const id = this.cleanDevice6[i]?.id;
                const isSync = 'Yes';
                // eslint-disable-next-line max-len
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice6[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.6 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[5]?.id])
            .then((res2: any) => {
              console.log('Result: ' + JSON.stringify(res2));
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock6 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock6.length; i++) {
                  const id = this.testSingleKnock6[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock6[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.6 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[5]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock6 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock6.length; i++) {
                  const id = this.testSounderKnock6[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // update online
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock6[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

        // END PANEL 6 START PANEL 7
        if (this.panels[6] !== undefined) {
          const panel7Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel7Sql, [cert?.id, this.panels[6]?.id]).then((panel7Data: any) => {
            if (panel7Data.rows.length > 0) {
              const panel7Res = panel7Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel7Res?.id}`, [isSync, user?.id])
              .then((updatePanel7: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel7));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel7Res).subscribe((panel7Sync: any) => {
                  console.log('Preservice Check Panel 7 Sync Status: ' + JSON.stringify(panel7Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 7: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 7: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.7
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[6]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice7 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice7.length; i++) {
                const id = this.cleanDevice7[i]?.id;
                const isSync = 'Yes';
                // eslint-disable-next-line max-len
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice7[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.7 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[6]?.id])
            .then((res2: any) => {
              console.log('Result: ' + JSON.stringify(res2));
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock7 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock7.length; i++) {
                  const id = this.testSingleKnock7[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock7[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.7 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[6]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock7 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock7.length; i++) {
                  const id = this.testSounderKnock7[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // update online
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock7[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

        // END PANEL 7 START PANEL 8
        if (this.panels[7] !== undefined) {
          const panel8Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel8Sql, [cert?.id, this.panels[7]?.id]).then((panel8Data: any) => {
            if (panel8Data.rows.length > 0) {
              const panel8Res = panel8Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel8Res?.id}`, [isSync, user?.id])
              .then((updatePanel8: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel8));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel8Res).subscribe((panel8Sync: any) => {
                  console.log('Preservice Check Panel 8 Sync Status: ' + JSON.stringify(panel8Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 8: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 8: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.8
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[7]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice8 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice8.length; i++) {
                const id = this.cleanDevice8[i]?.id;
                const isSync = 'Yes';
                const updateValues = [isSync];
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice8[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 5.8 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[7].id])
            .then((res2: any) => {
              console.log('Result: ' + JSON.stringify(res2));
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock8 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock8.length; i++) {
                  const id = this.testSingleKnock8[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock8[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.8 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[7]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock8 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock8.length; i++) {
                  const id = this.testSounderKnock8[i]?.id;
                  const isSync = 'Yes';
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock8[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

        // END PANEL 8 START PANEL 9
        if (this.panels[8] !== undefined) {
          const panel9Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel9Sql, [cert?.id, this.panels[8]?.id]).then((panel9Data: any) => {
            if (panel9Data.rows.length > 0) {
              const panel9Res = panel9Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel9Res?.id}`, [isSync, user?.id])
              .then((updatePanel9: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel9));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel9Res).subscribe((panel9Sync: any) => {
                  console.log('Preservice Check Panel 9 Sync Status: ' + JSON.stringify(panel9Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 9: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 9: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.9
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[8]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice9 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice9.length; i++) {
                const id = this.cleanDevice9[i]?.id;
                const isSync = 'Yes';
                const updateValues = [isSync];
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice9[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('fire_sp_template_device_loops_table ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 5.9 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[8]?.id])
            .then((res2: any) => {
              console.log('Result: ' + JSON.stringify(res2));
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock9 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock9.length; i++) {
                  const id = this.testSingleKnock9[i]?.id;
                  const isSync = 'Yes';
                  const updateValues = [isSync];
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock9[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.9 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[8]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock9 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock9.length; i++) {
                  const id = this.testSounderKnock9[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // update online
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock9[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

        // END PANEL 9 START PANEL 10
        if (this.panels[9] !== undefined) {
          const panel10Sql = 'SELECT * FROM fire_sp_template_panels_post_data WHERE service_cert_id=? AND panel_id=?';
          this.database.executeSql(panel10Sql, [cert?.id, this.panels[9]?.id]).then((panel10Data: any) => {
            if (panel10Data.rows.length > 0) {
              const panel10Res = panel10Data.rows.item(0);
              const isSync = 'Yes';
              // eslint-disable-next-line max-len
              this.database.executeSql(`UPDATE fire_sp_template_panels_post_data SET isSync=?, tech_id=? WHERE id=${panel10Res?.id}`, [isSync, user?.id])
              .then((updatePanel10: any) => {
                console.log('Updated: ' + JSON.stringify(updatePanel10));
                // POST ONLINE
                this.http.post(this.url + 'sync-preservice-check.php', panel10Res).subscribe((panel10Sync: any) => {
                  console.log('Preservice Check Panel 10 Sync Status: ' + JSON.stringify(panel10Sync));
                }, err => {
                  console.log('3.1 Post Error Panel 10: ' + JSON.stringify(err));
                });
              }, err => {
                console.log('3.1 Update Error Panel 10: ' + JSON.stringify(err));
              });
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });
          //POINT 4.10
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[9]?.id])
          .then((res: any) => {
            console.log('Result: ' + JSON.stringify(res));
            if (res.rows.length > 0) {
              const devices = [];
              for(let i=0; i < res.rows.length; i++) {
                devices.push(res.rows.item(i));
              }
              this.cleanDevice10 = devices;
              // eslint-disable-next-line @typescript-eslint/prefer-for-of
              for(let i=0; i < this.cleanDevice10.length; i++) {
                const id = this.cleanDevice10[i]?.id;
                const isSync = 'Yes';
                const updateValues = [isSync];
                console.log(updateValues);
                // eslint-disable-next-line max-len
                this.database.executeSql(`UPDATE fire_sp_template_device_loops_table SET isSync=? WHERE id=${id}`, updateValues).then((resUpdate: any) => {
                  console.log(resUpdate);
                  // update online
                  this.http.post(this.url + 'sync-clean-device.php', this.cleanDevice10[i]).subscribe((resCleanD: any) => {
                    console.log(resCleanD);
                  });
                }, err => {
                  console.log('ERROR: ' + JSON.stringify(err));
                });
              }
            }
          }, err => {
            console.log('Select Error: ' + JSON.stringify(err));
          });

          //POINT 5.10 Single Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_device_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[9]?.id])
            .then((res2: any) => {
              console.log('Result: ' + JSON.stringify(res2));
              if (res2.rows.length > 0) {
                const devicesSingle = [];
                for (let i = 0; i < res2.rows.length; i++) {
                  devicesSingle.push(res2.rows.item(i));
                }
                this.testSingleKnock10 = devicesSingle;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSingleKnock10.length; i++) {
                  const id = this.testSingleKnock10[i]?.id;
                  const isSync = 'Yes';
                  const updateValues = [isSync];
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_device_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateDevice: any) => {
                    console.log(updateDevice);
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-single-knock-device.php', this.testSingleKnock10[i]).subscribe((resCleanD: any) => {
                      console.log(resCleanD);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_device_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

          //POINT 5.10 Sounders Knock
          // eslint-disable-next-line max-len
          this.database.executeSql(`SELECT * FROM fire_sp_template_device_loops_table_sounder_knock WHERE service_type_id=? AND site_id=? AND panel_id=?`, [cert?.service_type_id, cert?.site_id, this.panels[9]?.id])
            .then((res3: any) => {
              console.log('Result: ' + JSON.stringify(res3));
              if (res3.rows.length > 0) {
                const devicesSounder = [];
                for (let i = 0; i < res3.rows.length; i++) {
                  devicesSounder.push(res3.rows.item(i));
                }
                this.testSounderKnock10 = devicesSounder;
                // eslint-disable-next-line @typescript-eslint/prefer-for-of
                for (let i = 0; i < this.testSounderKnock10.length; i++) {
                  const id = this.testSounderKnock10[i]?.id;
                  const isSync = 'Yes';
                  // eslint-disable-next-line max-len
                  const updateValues = [isSync];
                  console.log(updateValues);
                  // eslint-disable-next-line max-len
                  this.database.executeSql(`UPDATE fire_sp_template_device_loops_table_sounder_knock SET isSync=? WHERE id=${id}`, updateValues).then((updateSounder: any) => {
                    console.log(updateSounder);
                    // update online
                    // eslint-disable-next-line max-len
                    this.http.post(this.url + 'sync-test-sounder-device.php', this.testSounderKnock10[i]).subscribe((resSounder: any) => {
                      console.log(resSounder);
                    });
                  }, err => {
                    console.log('fire_sp_template_device_loops_table_sounder_knock ERROR: ' + JSON.stringify(err));
                  });
                }
              }
            }, err => {
              console.log('Select Error: ' + JSON.stringify(err));
            });

        }

      }, err => {
        console.log('Panels Select Error: ' + JSON.stringify(err));
      });

      const sync = 'Yes';
      console.log(cert?.cert_id);
      this.database.executeSql(`UPDATE fire_sp_service_certificates SET isSync=? WHERE cert_id=${cert?.cert_id}`,[sync])
      .then((certRes: any) => {
        console.log('Sync Result: ' + JSON.stringify(certRes));
      });
      //UPDATE THE ONLINE SERVICE CARD
      this.http.post(this.url + 'sync-service-card.php', cert).subscribe((card: any) => {
        console.log('Synced.....');
      });
      loading.dismiss();
      this.flashMessage('Service certificates syncing complete...');
    }); // Close Storage
    loading.dismiss();
  }

}
