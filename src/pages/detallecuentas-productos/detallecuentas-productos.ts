import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
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

  public arreglo: any = [];

  public identificador;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private productosPrd: ProductosProvider, private toasCtrl: ToastController,
    private TikectPdr: TicketsProvider, private alertCtrl: AlertController) {
    let id = navParams.get("id");

    this.identificador = navParams.get("folio");
    productosPrd.getProductosCategoria(id).subscribe(datos => {
      for (let item of datos) {
        item.cantidad = 1;
        item.observaciones = "";
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

  public agregarCarrito(obj,indice): any {
    console.log(obj);
    if(obj.esmixta == true){
      let alerta = this.alertCtrl.create({
        message:"¿Deseas agregar producto a la orden?",
        inputs:[{
          type: "checkbox",
          value: "camaron",
          name: "camaron",
          label: "Cámaron",
          checked: false
        },
        {
          type: "checkbox",
          value: "lechon",
          name: "lechon",
          label: "Lechon",
          checked: false
        },
        {
          type: "checkbox",
          value: "arrachera",
          name: "arrachera",
          label: "Arrachera",
          checked: false
        },
        {
          type: "checkbox",
          value: "cochinita",
          name: "cochinita",
          label: "Cochinita",
          checked: false
        },
        {
          type: "checkbox",
          value: "pescado",
          name: "pescado",
          label: "Pescado",
          checked: false
        }],
        buttons:[{text:"Sí",handler : (datos)=>{
          let observaciones = "";
          for(let item of datos){
              observaciones = observaciones + item + ", ";
          }
          this.agregaralCarrito(obj,indice,observaciones);
        }},"No"]

    });

    alerta.present();

    }else{
      let alerta = this.alertCtrl.create({
        message:"¿Deseas agregar producto a la orden?",
        buttons:[{text:"Sí",handler : ()=>{
          this.agregaralCarrito(obj,indice,"");
        }},"No"]

    });

    alerta.present();
    }
  }

  private agregaralCarrito(obj,indice,obervacionextendido){
    var enviar = {
      id_ticket: this.identificador,
      id_producto: obj.id_producto,
      cantidad: obj.cantidad,
      observaciones:this.arreglo[indice].observaciones,
      tipo_producto:1
    }

    enviar.observaciones = obervacionextendido;
    
    this.TikectPdr.insertDetalle(enviar).subscribe(datos => {
      let toas = this.toasCtrl.create({ message: datos.respuesta, duration: 1000 });
      toas.present();
      
      this.arreglo[indice].observaciones = "";
    });
  }

  public observaciones(indice): any {
    let mensajeObservaciones = this.alertCtrl.create({
      title: "Observaciones",
      message: "Observaciones a la orden",
      inputs:[
      {
        placeholder:"Observaciones",
        type:"text",
        name:"observaciones"
      }],
      buttons:[{
        text:"Aceptar",
        handler : datos => {
          this.arreglo[indice].observaciones = datos.observaciones;
          let toas = this.toasCtrl.create({message:"Observaciones agregadas a la orden",duration:1500});
          toas.present();
        }
      },
     {text:"Cancelar"}]
    });

    mensajeObservaciones.present();
  }

}
