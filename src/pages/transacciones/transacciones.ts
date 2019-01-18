import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { TicketPage } from '../ticket/ticket';

@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html'
})
export class TransaccionesPage {

  private id_carrito;
  public arreglo:any = [];
  constructor(public navCtrl: NavController, private login: LoginProvider,
              private ticketsPrd:TicketsProvider) {

      this.id_carrito = this.login.getCarrito();
      this.ticketsPrd.getTicketsCanceladosCobrados(this.id_carrito).subscribe(datos => {
        this.arreglo = datos;
      });
  }



  public actualizandoTransacciones(refresher): any {

    this.ticketsPrd.getTicketsCanceladosCobrados(this.id_carrito).subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }

  public reimprimir(obj):any{

    this.navCtrl.push(TicketPage,{id_ticket:obj.id_ticket});
  }
}
