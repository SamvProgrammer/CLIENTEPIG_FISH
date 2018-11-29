import { Component } from '@angular/core';
import { NavController,FabContainer } from 'ionic-angular';
import { SubcatalogosPage } from '../subcatalogos/subcatalogos';
import { LoginProvider } from '../../providers/login/login';

@Component({
  selector: 'page-catalogos',
  templateUrl: 'catalogos.html'
})
export class catalogosTab {

  constructor(public navCtrl: NavController,private login:LoginProvider) {

  }


  public clickimagen(numero):any{

    this.navCtrl.push(SubcatalogosPage,{'obj':numero});
  }

  public ingresarSistema(fab:FabContainer):any{
    fab.close();
    this.login.entrarSistema();
  }

  public salir(){
    this.login.setEntrar(false);
  }
}
