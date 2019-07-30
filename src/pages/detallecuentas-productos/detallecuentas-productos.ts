import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { DetallecuentasProductosMixtasPage } from '../detallecuentas-productos-mixtas/detallecuentas-productos-mixtas';




@Component({
  selector: 'page-detallecuentas-productos',
  templateUrl: 'detallecuentas-productos.html',
})
export class DetallecuentasProductosPage {

  public arreglo: any = [];
  public arregloPedidoCliente:any = [];

  public identificador;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private productosPrd: ProductosProvider, private toasCtrl: ToastController,
    private TikectPdr: TicketsProvider, private alertCtrl: AlertController,private modal:ModalController) {
    let id = navParams.get("id");

    this.identificador = navParams.get("folio");
    let datos = navParams.get("productos");
    this.arregloPedidoCliente = navParams.get("pedidosCliente");
    console.log("Los pedidos del cliente son");
    console.log(this.arregloPedidoCliente);
      for (let item of datos) {
        item.cantidad = 1;
        item.observaciones = "";
      }

      this.arreglo = datos;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallecuentasProductosPage');
  }

  public salir() {
    this.viewCtrl.dismiss(this.arregloPedidoCliente);
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
    if(obj.esmixta == 1){
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

  

    }else if(obj.esmixta == 2){

      let modalmixta = this.modal.create(DetallecuentasProductosMixtasPage);
      modalmixta.present();

      modalmixta.onDidDismiss(productosRecibidos => {
        console.log(productosRecibidos);
        if(productosRecibidos != null && productosRecibidos != undefined){

          let observaciones = "";
          console.log("Estas son observaciones");
          console.log(productosRecibidos);
          for(let item of productosRecibidos.productos){
              let auxObservacion = item.cantidad+" "+item.nombre;
              observaciones = observaciones + auxObservacion+"\n";
          }
          this.agregaralCarrito(obj,indice,observaciones);

        }
      });

    } else{
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
      observaciones:obj.observaciones + " "+obervacionextendido,
      notificacion:obj.notificacion,  
      ruta_imagen:"",
      servido:false,
      nombre:obj.nombre
    }

    console.log("Este es el obj a agregar");
    console.log(obj);

    
    console.log("ObservacionExtendi");

    if (enviar.observaciones == null) {
      enviar.observaciones = "";
    }
    
   // this.TikectPdr.insertDetalle(enviar).subscribe(datos => {
     // let toas = this.toasCtrl.create({ message: datos.respuesta, duration: 1000 });
      //toas.present();
      
     // this.arreglo[indice].observaciones = "";
    //});
    enviar.ruta_imagen = obj.ruta_imagen;
    enviar.servido = false;
    console.log(enviar);
    this.insertarDetalleConsumidor(enviar);
    obj.cantidad = 1;
  }


  public insertarDetalleConsumidor(obj) {
    let arreglo = this.arregloPedidoCliente.cliente1;
    arreglo.push(obj);
    let mensaje = this.toasCtrl.create({ message: "Producto agregado a la orden a enviar", duration: 1500 });
    mensaje.present();
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
