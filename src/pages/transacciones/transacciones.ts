import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { TicketPage } from '../ticket/ticket';
import { GlobalesProvider } from '../../providers/globales/globales';

@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html'
})
export class TransaccionesPage {

  private id_carrito;
  public arreglo:any = [];
  constructor(public navCtrl: NavController, private login: LoginProvider,
              private ticketsPrd:TicketsProvider,private globales:GlobalesProvider) {

      this.id_carrito = this.login.getCarrito();
      this.ticketsPrd.getTicketsCanceladosCobrados(this.id_carrito,undefined).subscribe(datos => {
        this.arreglo = datos;
      });
  }


  ionViewDidEnter(){
    this.ticketsPrd.getTicketsCanceladosCobrados(this.id_carrito,undefined).subscribe(datos => {
      this.arreglo = datos;
    });

  }
  public actualizandoTransacciones(refresher): any {

    this.ticketsPrd.getTicketsCanceladosCobrados(this.id_carrito,undefined).subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    
  }

  public reimprimir(obj):any{

    this.navCtrl.push(TicketPage,{id_ticket:obj.id_ticket});
  }

  public salir(){
    this.globales.cerrarAplicacion();
  }
}
