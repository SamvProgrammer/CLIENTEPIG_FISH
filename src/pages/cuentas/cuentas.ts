import { Component } from '@angular/core';
import { NavController, AlertController, FabContainer, ModalController, ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { DetallecuentasPage } from '../detallecuentas/detallecuentas';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { DetallecuentasResumenPage } from '../detallecuentas-resumen/detallecuentas-resumen';
import { TicketPage } from '../ticket/ticket';

@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html'
})
export class cuentasPage {

  private detalle: any = DetallecuentasPage;
  public folio = 0;//Esta variable es temporal... favor de eliminar...
  public arreglo: any = [];
  private id_carrito;
  constructor(public navCtrl: NavController, public alerta: AlertController, private login: LoginProvider, private modal: ModalController,
    private ticketsPrd: TicketsProvider, private toasCtrl: ToastController) {
    this.id_carrito = login.getCarrito();
    this.traerCuentas();
  }

  public traerCuentas(): any {
    this.ticketsPrd.getTickets(this.id_carrito).subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public actualizandoTransacciones(refresher): any {

    this.ticketsPrd.getTickets(this.id_carrito).subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
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
            id_carrito: this.login.getCarrito(),
            fecha : today
          };


          console.log(objTicket);

          this.ticketsPrd.insert(objTicket).subscribe(datos => {
            let t1 = this.toasCtrl.create({ message: datos.respuesta, duration: 1000 });
            t1.present();
            const mdl = this.modal.create(this.detalle, { orden: datos.nombre, folio: datos.id_ticket });
            mdl.onDidDismiss(datos => {
              this.traerCuentas();
              if (datos) {
                this.traerCuentas();
                this.navCtrl.push(TicketPage, { id_ticket: datos.id_ticket, billete: datos.billete });
              }
            });
            mdl.present();
          });

        }
      }]

    });
    alerta1.present();
  }

  public cancelar(indice): any {
    let mensaje = this.alerta.create({
      title: "¿Desea cancelar la cuenta?", buttons: [{
        text: "Si", handler: () => {
          this.ticketsPrd.cancelar(indice).subscribe(datos => {
            let toast = this.toasCtrl.create({ message: "Cuenta cancelada correctamente", duration: 1500 });
            toast.present();
            this.traerCuentas();
          });
        }
      }, { text: "No" }]
    });
    mensaje.present();
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }

  public entrarDetalle(obj): any {
    let mdl = this.modal.create(this.detalle, { orden: obj.nombre, folio: obj.id_ticket });
    mdl.present();
    mdl.onDidDismiss(datos => {
      if (datos) {
        this.traerCuentas();
        this.navCtrl.push(TicketPage, { id_ticket: datos.id_ticket, billete: datos.billete });
      }
    });
  }

  public cobrar(id): any {
    let modal = this.modal.create(DetallecuentasResumenPage, { id_ticket: id });
    modal.present();

    modal.onDidDismiss(datos => {
      if (datos) {
        this.traerCuentas();
        this.traerCuentas();
        this.navCtrl.push(TicketPage, { id_ticket: datos.id_ticket, billete: datos.billete });
      }
    });
  }


}
