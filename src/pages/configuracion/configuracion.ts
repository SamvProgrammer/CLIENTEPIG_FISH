import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnlaceProductoinventarioPage } from '../enlace-productoinventario/enlace-productoinventario';
import { BluetoothPage } from '../bluetooth/bluetooth';

/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracionPage');
  }


  public abrirpagina():any{

      this.navCtrl.push(EnlaceProductoinventarioPage);
  }

  public abrirpaginabluetooth(){
    this.navCtrl.push(BluetoothPage);
  }
}
