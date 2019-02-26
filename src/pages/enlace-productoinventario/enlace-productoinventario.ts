import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { EnlaceProductoinventarioAddPage } from '../../pages/enlace-productoinventario-add/enlace-productoinventario-add';

/**
 * Generated class for the EnlaceProductoinventarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-enlace-productoinventario',
  templateUrl: 'enlace-productoinventario.html',
})
export class EnlaceProductoinventarioPage {
  public arreglo: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private productosPrd: ProductosProvider) {


  }
  ionViewDidEnter() {
    this.traerProductos();
  }

  public traerProductos(): any {

    this.productosPrd.getProductos().subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public agregarInventario(obj):any{

      this.navCtrl.push(EnlaceProductoinventarioAddPage,{obj:obj});
  }

}
