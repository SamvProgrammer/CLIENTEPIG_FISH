import { Component } from '@angular/core';
import {  NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the DetallecuentasProductosMixtasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detallecuentas-productos-mixtas',
  templateUrl: 'detallecuentas-productos-mixtas.html',
})
export class DetallecuentasProductosMixtasPage {


  public arreglo:any = [
    {nombre:"Camaron",cantidad: 0,imagen : "../../assets/icon/camaron.png"},
    {nombre:"Pescado",cantidad: 0,imagen : "../../assets/icon/pescado.png"},
    {nombre:"Arrachera",cantidad: 0,imagen : "../../assets/icon/arrachera.png"},
    {nombre:"Cochinita",cantidad: 0,imagen : "../../assets/icon/cochinita.jpg"},
    {nombre:"Lechon",cantidad: 0,imagen : "../../assets/icon/lechon.png"}
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl:ViewController) {
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

  public agregar(){
    let productosagregados:any = [];

    for(let item of this.arreglo){
        if(item.cantidad != 0){
          productosagregados.push(item);
        }
    }


    this.viewCtrl.dismiss({productos:productosagregados});
    
  }

  public salir(){
   this.viewCtrl.dismiss();
  }

}
