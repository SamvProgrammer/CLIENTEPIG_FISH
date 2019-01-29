import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';

/**
 * Generated class for the DetallecocineroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-detallecocinero',
  templateUrl: 'detallecocinero.html',
})
export class DetallecocineroPage {
  
  public arreglo:any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,private ticketPrd:TicketsProvider,
              private loginPrd:LoginProvider) {
    
    this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
      this.arreglo = datos;
    });
  }
 
  public actualizando(refresher): any {
    this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }

}
