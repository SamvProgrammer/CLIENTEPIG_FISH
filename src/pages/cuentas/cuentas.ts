import { Component } from '@angular/core';
import { NavController, AlertController, FabContainer, ModalController,ToastController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { DetallecuentasPage } from '../detallecuentas/detallecuentas';
import { TicketsProvider } from '../../providers/tickets/tickets';

@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html'
})
export class cuentasPage {

  private detalle: any = DetallecuentasPage;
  public folio = 0;//Esta variable es temporal... favor de eliminar...
  public arreglo:any = [];
  constructor(public navCtrl: NavController, public alerta: AlertController, private login: LoginProvider, private modal: ModalController,
  private ticketsPrd:TicketsProvider,private toasCtrl:ToastController) {

  }

  public actualizandoTransacciones(refresher): any {

    setTimeout(() => {
      refresher.complete();
    }, 1000);
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
          let identificadorCuenta = datos.cuenta;
          let objTicket = {
             id_user:12,
             nombre:identificadorCuenta,
             id_carrito:this.login.getCarrito()
          };
          console.log(objTicket);
          this.ticketsPrd.insert(objTicket).subscribe(datos => {
            let t1 = this.toasCtrl.create({message:datos.respuesta,duration:1000});
            t1.present();
            const mdl = this.modal.create(this.detalle,{orden:datos.nombre,folio:datos.id_folio});
            mdl.present();
         });
         
        }
      }]

    });
    alerta1.present();
  }

  public cancelar(indice): any {
    console.log(indice);
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }

  public entrarDetalle(obj): any {

    const mdl = this.modal.create(this.detalle,{orden:obj.nombre,folio:obj.id});
    mdl.present();
  }
}
