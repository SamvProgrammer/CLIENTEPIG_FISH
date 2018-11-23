import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html'
})
export class TransaccionesPage {

  constructor(public navCtrl: NavController, private login: LoginProvider) {

  }

  public actualizandoTransacciones(refresher): any {

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }
}
