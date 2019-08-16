import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController, Platform, LoadingController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { Storage } from '@ionic/storage';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { GlobalesProvider } from '../../providers/globales/globales';
import { ImpresionesProvider } from '../../providers/impresiones/impresiones';
@Component({
  selector: 'page-cuentas-detalle-antesdeenviar',
  templateUrl: 'cuentas-detalle-antesdeenviar.html',
})
export class CuentasDetalleAntesdeenviarPage {

  public arreglo: any = [];
  public orden = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController, private alertCtrl: AlertController, private ticketPrd: TicketsProvider,
    private toasCtrl: ToastController, private plataforma: Platform, private storage: Storage, private usuariosPrd: UsuariosProvider,
    private globales: GlobalesProvider, private impresionesPrd: ImpresionesProvider, private configuraciones: GlobalesProvider,
    private loadCtrl: LoadingController) {
    let aux = this.navParams.get("arreglo");
    this.orden = this.navParams.get("orden");

    for (let llave in aux) {
      let arregloAux = aux[llave];
      this.arreglo.push(arregloAux);
    }
    console.log(this.arreglo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CuentasDetalleAntesdeenviarPage');
  }



  public salir() {
    this.viewCtrl.dismiss();
  }

  public confirmar() {
    let alerta = this.alertCtrl.create({
      subTitle: "¿Deseas confirmar la orden?",
      message: "Confirmar la orden notificara a cocina y barra lo que se pidio",
      buttons: [{
        text: "sí", handler: () => {

          this.enviandoOrden();
        }
      }, "no"]
    });

    alerta.present();
  }


  public enviandoOrden() {


    let configuraciones = this.globales.getConfiguraciones();

    if (configuraciones == null || configuraciones == undefined) {
      this.globales.setConfiguraciones({});
      configuraciones = this.globales.getConfiguraciones();
    }

    let cocina = configuraciones.enviarCocina;
    let barra = configuraciones.enviarBarra;
    let impresoraCocina = configuraciones.impresoraCocina;
    let inventarios = configuraciones.inventarios;

    cocina = cocina == undefined ? false : cocina;
    barra = barra == undefined ? false : barra;

    impresoraCocina = impresoraCocina == undefined ? false : impresoraCocina;
    inventarios = inventarios == undefined ? false : inventarios;


    console.log(configuraciones);


    let arregloPedidosCopia = {};
    for (let llave in this.arreglo) {
      arregloPedidosCopia[llave] = [];
      for (let item of this.arreglo[llave]) {
        let obj = {};
        for (let llave2 in item) {
          obj[llave2] = item[llave2];
        }
        arregloPedidosCopia[llave].push(obj);
      }
    }

    let arregloEnviar = [];
    let reenvio = [];
    for (let x in arregloPedidosCopia) {
      for (let y of arregloPedidosCopia[x]) {
        if (y != null || y != undefined) {
          if (y.servido != true) {
            arregloEnviar.push(y);
          }

          reenvio.push(y);
        }
      }

    }

    for (let item of arregloEnviar) {
      item.ruta_imagen = "";
      if (item.notificacion == 1) {
        item.servido = cocina;
      }

      if (item.notificacion == 2) {
        item.servido = barra;
      }
    }
    let cargando = this.loadCtrl.create({ content: "Levantando orden espere" });
    cargando.present();





    if (arregloEnviar.length != 0) {

      let id_sucursal = this.usuariosPrd.getSucursal();
      
      if(inventarios == true){
        this.ticketPrd.insertDetalleListaIdSucursal(arregloEnviar, id_sucursal).subscribe(datos => {

          this.impresionesmetodo(arregloEnviar, cargando, impresoraCocina);
  
        }, error => {
  
          cargando.dismiss();
          console.log(error);
          console.log(error.error);
          console.log(error.error.message);
          let alerta = this.alertCtrl.create({ message: error.error.message, buttons: ["Entendido"] });
          alerta.present();
  
  
        });

      }else{

        console.log("Antes de enviar");
        this.ticketPrd.insertDetalleLista(arregloEnviar).subscribe(datos => {

          this.impresionesmetodo(arregloEnviar, cargando, impresoraCocina);
  
        }, error => {
  
          console.log("Sale error"
          );
          cargando.dismiss();
          console.log(error);
          console.log(error.error);
          console.log(error.error.message);
          let alerta = this.alertCtrl.create({ message: error.error.message, buttons: ["Entendido"] });
          alerta.present();
  
  
        });

      }


    } else {
      console.log("Ahora si entra al método apra reeenviar");
      console.log("---------------------------------------------------------");

      cargando.dismiss();
      let alerta = this.alertCtrl.create({
        message: "¿Deseas reemprimir la orden?", title: "Reimpresión",
        buttons: [{
          text: "Sí", handler: () => {

            let im = this.loadCtrl.create({ content: "Reimprimiendo ticket" });
            im.present();

            this.impresionesmetodo(reenvio, im, cocina);

          }
        }, "No"]
      });

      alerta.present();

    }


  }

  public servidoListo(mensaje) {

    let toas = this.toasCtrl.create({ message: mensaje, duration: 1500 });
    toas.present();


    this.viewCtrl.dismiss({ servido: true });
  }


  public eliminarLista(obj, indice, indicepadre) {
    if (obj.servido != true) {
      let mensaje = this.alertCtrl.create({
        subTitle: "¿Deseas eliminar elemento de la orden?",
        message: "Se eliminara el elemento de la orden antes de ser enviado a concina",
        buttons: [{
          text: "Sí", handler: () => {
            let arreglo1 = this.arreglo[indicepadre];
            arreglo1.splice(indice, 1);
            let toas = this.toasCtrl.create({ message: "Producto eliminado de la orden", duration: 1500 });
            toas.present();
          }
        }, "No"]
      });
      mensaje.present();
    }
  }


  public impresionesmetodo(arregloEnviar, cargando, impresoraCocina) {

    console.log("Si entra a inseetrar en la base de datos");
    let codigos = this.impresionesPrd.getCodigosImpresora();


    let mensajeCocina = codigos.TEXT_FORMAT.TXT_ALIGN_CT + codigos.TEXT_FORMAT.TXT_4SQUARE + codigos.TEXT_FORMAT.TXT_BOLD_ON + "PEDIDOS COCINA" + codigos.LF + "PRODUCTO\n" + codigos.TEXT_FORMAT.TXT_NORMAL + codigos.TEXT_FORMAT.TXT_BOLD_OFF + codigos.TEXT_FORMAT.TXT_ALIGN_LT + codigos.LF + codigos.TEXT_FORMAT.TXT_CUSTOM_SIZE(1, 1);
    let mensajeBarra = codigos.TEXT_FORMAT.TXT_ALIGN_CT + codigos.TEXT_FORMAT.TXT_4SQUARE + codigos.TEXT_FORMAT.TXT_BOLD_ON + "PEDIDOS BARRA" + codigos.LF + "PRODUCTO\n" + codigos.TEXT_FORMAT.TXT_NORMAL + codigos.TEXT_FORMAT.TXT_BOLD_OFF + codigos.TEXT_FORMAT.TXT_ALIGN_LT + codigos.LF + codigos.TEXT_FORMAT.TXT_CUSTOM_SIZE(1, 1);

    console.log(arregloEnviar);
    for (let item of arregloEnviar) {
      if (item.notificacion == 1) {
        let aux = "";
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + `*${item.nombre}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Cantidad: ${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t${item.cantidad}\n${codigos.TEXT_FORMAT.TXT_BOLD_ON} Cuenta:${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t\t${this.orden}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Mesero:${codigos.TEXT_FORMAT.TXT_BOLD_OFF} ${this.usuariosPrd.getNombreUsuario()}\n`;
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + " Observaciones:" + codigos.TEXT_FORMAT.TXT_BOLD_OFF + item.observaciones + "\n_______________________\n";
        mensajeCocina = mensajeCocina + aux;
      } else if (item.notificacion == 2) {
        let aux = "";
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + `*${item.nombre}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Cantidad: ${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t${item.cantidad}\n${codigos.TEXT_FORMAT.TXT_BOLD_ON} Cuenta:${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t\t${this.orden}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Mesero:${codigos.TEXT_FORMAT.TXT_BOLD_OFF}${this.usuariosPrd.getNombreUsuario()}\n`;
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + " Observaciones:" + codigos.TEXT_FORMAT.TXT_BOLD_OFF + item.observaciones + "\n_______________________\n";
        mensajeBarra = mensajeBarra + aux;

      } else {

        let aux = "";
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + `*${item.nombre}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Cantidad: ${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t${item.cantidad}\n${codigos.TEXT_FORMAT.TXT_BOLD_ON} Cuenta:${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t\t${this.orden}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Mesero:${codigos.TEXT_FORMAT.TXT_BOLD_OFF} ${this.usuariosPrd.getNombreUsuario()}\n`;
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + " Observaciones:" + codigos.TEXT_FORMAT.TXT_BOLD_OFF + item.observaciones + "\n_______________________\n";
        mensajeCocina = mensajeCocina + aux;

        aux = "";
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + `*${item.nombre}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Cantidad: ${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t${item.cantidad}\n${codigos.TEXT_FORMAT.TXT_BOLD_ON} Cuenta:${codigos.TEXT_FORMAT.TXT_BOLD_OFF}\t\t${this.orden}\n ${codigos.TEXT_FORMAT.TXT_BOLD_ON}Mesero:${codigos.TEXT_FORMAT.TXT_BOLD_OFF}${this.usuariosPrd.getNombreUsuario()}\n`;
        aux = aux + codigos.TEXT_FORMAT.TXT_BOLD_ON + " Observaciones:" + codigos.TEXT_FORMAT.TXT_BOLD_OFF + item.observaciones + "\n_______________________\n";
        mensajeBarra = mensajeBarra + aux;

      }
    }

    mensajeBarra = mensajeBarra + "_______________________________\n\n";
    mensajeCocina = mensajeCocina + "_______________________________\n\n";

    console.log("Este es el mensaje de cocina");
    console.log(mensajeCocina);
    console.log("Este es mensaje de barra");
    console.log(mensajeBarra);


    if (impresoraCocina == true) {
      this.globales.conectarCocina(mensajeCocina).then(cocina => {
        this.globales.conectarBarra(mensajeBarra).then(barra => {
          this.servidoListo("Orden enviada correctamente");
          cargando.dismiss();
        }).catch(mensaje => {
          this.servidoListo("Error al enviar a impresora cocina --> barra");
          cargando.dismiss();
        });
      }).catch(errcocina => {
        this.globales.conectarBarra(mensajeBarra).then(barra => {
          this.servidoListo("Orden enviada correctamente");
          cargando.dismiss();
        }).catch(objmensaje => {
          this.servidoListo("Error al enviar a impresora desde barra");
          cargando.dismiss();
        });
      });
    } else {
      this.servidoListo("Orden enviada correctamente");
      cargando.dismiss();
      console.log("No se manda a impresora");
    }
  }

}
