import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';

/**
 * Generated class for the DetallecuentasProductosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detallecuentas-productos',
  templateUrl: 'detallecuentas-productos.html',
})
export class DetallecuentasProductosPage {

  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
              private productosPrd:ProductosProvider) {
    let identificador = navParams.get("id");
    productosPrd.getProductosCategoria(identificador).subscribe(datos => {
        for(let item of datos){
          item.cantidad = 1;
        }

        this.arreglo = datos;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallecuentasProductosPage');
  }

  public salir() {
    this.viewCtrl.dismiss();
  }

  public getcantidad(indice): any {
    return this.arreglo[indice].cantidad;
  }

  public restar(indice): any {
    let cantidad = this.arreglo[indice].cantidad;
    if (cantidad == 1)
      cantidad = 1;
    else
      cantidad = cantidad - 1;

    this.arreglo[indice].cantidad = cantidad;
  }

  public sumar(indice): any {
    let cantidad = this.arreglo[indice].cantidad;
    cantidad = cantidad + 1;
    this.arreglo[indice].cantidad = cantidad;

  }

}
