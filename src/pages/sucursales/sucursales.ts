import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';

/**
 * Generated class for the SucursalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-sucursales',
  templateUrl: 'sucursales.html',
})
export class SucursalesPage {


  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private carritoPrd:CarritoProvider) {
    this.carritoPrd.getCarritos().subscribe(datos => {this.arreglo = datos;});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SucursalesPage');
  }
  public actualizando(refresher): any {
    
  }
}
