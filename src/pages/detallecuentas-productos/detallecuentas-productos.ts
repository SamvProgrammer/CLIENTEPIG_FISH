import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ToastController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { TicketsProvider } from '../../providers/tickets/tickets';

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

  public identificador;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
              private productosPrd:ProductosProvider,private toasCtrl:ToastController,
              private TikectPdr:TicketsProvider) {
    let id = navParams.get("id");
    
    this.identificador = navParams.get("folio");
    productosPrd.getProductosCategoria(id).subscribe(datos => {
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

  public agregarCarrito(obj):any{
    var enviar = {
      id_ticket:this.identificador,
      id_producto:obj.id_producto,
      cantidad:obj.cantidad
    }

    this.TikectPdr.insertDetalle(enviar).subscribe(datos =>{
      let toas = this.toasCtrl.create({message:datos.respuesta,duration:1000});
      toas.present();
    });
    
  }

}
