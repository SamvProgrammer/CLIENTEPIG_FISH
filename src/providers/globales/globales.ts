import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController,App } from 'ionic-angular';
import { PaginaentrarPage } from '../../pages/paginaentrar/paginaentrar';


/*
  Generated class for the GlobalesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalesProvider {

  constructor(public http: HttpClient,private alertCtrl:AlertController,private appCtrl:App) {
    
  }


  public cerrarAplicacion(){    
    let alerta = this.alertCtrl.create({
      message: "¿Deseas salir de la aplicación?", subTitle: "Aviso",
      buttons: [{ text: "Si", handler: () => { this.appCtrl.getRootNavs()[1].setRoot(PaginaentrarPage) } }, "No"]
    });
    alerta.present();
}
}
