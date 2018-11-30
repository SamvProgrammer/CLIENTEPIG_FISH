import { Component } from '@angular/core';
import { NavController, AlertController, FabContainer, ModalController } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { DetallecuentasPage } from '../detallecuentas/detallecuentas';

@Component({
  selector: 'page-cuentas',
  templateUrl: 'cuentas.html'
})
export class cuentasPage {

  public mesas: Array<object> = [];
  private detalle: any = DetallecuentasPage;
  public folio = 0;//Esta variable es temporal... favor de eliminar...

  constructor(public navCtrl: NavController, public alerta: AlertController, private login: LoginProvider, private modal: ModalController) {

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
          this.folio = this.folio + 1;
          let obj = {
            id: this.folio,
            nombre: identificadorCuenta,
            fecha: '21/11/2018'
          }
          this.mesas.push(obj);
          const mdl = this.modal.create(this.detalle);
          mdl.present();
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

  public entrarDetalle(): any {

    const mdl = this.modal.create(this.detalle);
    mdl.present();
  }
}
