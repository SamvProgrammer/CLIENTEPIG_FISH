import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, FabContainer, AlertController, ToastController, ModalController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';


/**
 * Generated class for the SubcatalogosOrdenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-subcatalogos-orden',
  templateUrl: 'subcatalogos-orden.html',
})
export class SubcatalogosOrdenPage {

  public arreglo: any = [];
  private id_carrito;
  private producto;
  private tipo;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private alerta: AlertController, private toasCtrl: ToastController,
    private tickPrd: TicketsProvider, private loginPrd: LoginProvider, private modal: ModalController,
    private usuariosPrd:UsuariosProvider) {
    let carrito = usuariosPrd.getSucursal();
    this.id_carrito = carrito;
    tickPrd.getTickets(carrito).subscribe(datos => {
      console.log(carrito);
      this.arreglo = datos;
    });

    this.producto = navParams.get("parametro");
    this.tipo = navParams.get("tipo");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcatalogosOrdenPage');
  }

  public salir() {
    this.viewCtrl.dismiss();
  }
  public agregarCuenta(fab: FabContainer) {
    fab.close();
    let alerta1 = this.alerta.create({
      title: 'Agregando',
      subTitle: 'Cuenta nueva',
      inputs: [{
        name: 'cuenta',
        placeholder: 'Ingresar cuenta'
      }],
      buttons: [{
        text: "Ingresar",
        handler: datos => {
          //Para sacar el día de hoy en la comanda....
          let today = new Date();
  
          let identificadorCuenta = datos.cuenta;
          let objTicket = {
            id_user: 12,
            nombre: identificadorCuenta,
            id_carrito: this.usuariosPrd.getSucursal,
            fecha: today
          };
          this.tickPrd.getTickets(this.id_carrito).subscribe(d1 => {
            console.log(d1);
            this.arreglo = d1;
          });
          this.tickPrd.insert(objTicket).subscribe(datos => {
            let t1 = this.toasCtrl.create({ message: datos.respuesta, duration: 1000 });
            t1.present();
            this.tickPrd.getTickets(this.id_carrito).subscribe(datos => {
              this.arreglo = datos;
            });
          });

        }
      }]

    });
    alerta1.present();
  }

  public agregarCarrito(obj): any {

    let a1 = this.alerta.create({
      title: "Aviso:",message:"Cantidad y observaciones", inputs: [{ placeholder: "Cantidad", type: "number", name: "cant" },
      { placeholder: "Observaciones", type: "text", name: "observaciones" }]
      , buttons: [{
        text: "Agregar", handler: datos => {

          let enviar = {
            id_ticket: obj.id_ticket,
            id_producto: this.producto,
            cantidad: datos.cant,
            observaciones:datos.observaciones,
            tipo_producto:this.tipo
          }

          console.log(enviar);
          this.tickPrd.insertDetalle(enviar).subscribe(enviar => {
            let toas = this.toasCtrl.create({ message: enviar.respuesta, duration: 1500 });
            toas.present();
            this.viewCtrl.dismiss();
          });
        }
      }]
    });
    a1.present();
  }
}
