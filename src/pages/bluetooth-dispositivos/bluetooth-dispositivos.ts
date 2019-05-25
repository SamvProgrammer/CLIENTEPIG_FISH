import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

/**
 * Generated class for the BluetoothDispositivosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-bluetooth-dispositivos',
  templateUrl: 'bluetooth-dispositivos.html',
})
export class BluetoothDispositivosPage {

 
  public arreglo: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bt: BluetoothSerial, private loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let cargando = this.loadCtrl.create({ content: "Cargando" });
    cargando.present();
    this.bt.list().then(datos => {
      console.log(JSON.stringify(datos));
      this.arreglo = datos;
      cargando.dismiss();
    }).catch(err => {
      console.log(JSON.stringify(err))
      cargando.dismiss();
    });
  }


  public conectar(obj) {
   console.log("CONECTANDO A DISPOSITIVO YEEEIII");
    let cargando = this.loadCtrl.create({ content: "Conectando a impresora" });
    cargando.present();
    this.bt.connect(obj.address).subscribe(datos => {
      console.log(JSON.stringify(datos));
      cargando.dismiss();
      this.navCtrl.pop();
    }, err => {
      console.log(JSON.stringify(err));
      cargando.dismiss();
    });
  }

  public actualizando(refresher): any {


    this.bt.list().then(datos => {
      console.log(JSON.stringify(datos));
      this.arreglo = datos;
      refresher.complete();
    }).catch(err => {
      console.log(JSON.stringify(err))
      refresher.complete();
    });
  }

}
