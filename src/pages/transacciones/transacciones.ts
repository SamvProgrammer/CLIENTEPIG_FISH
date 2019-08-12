import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { TicketPage } from '../ticket/ticket';
import { GlobalesProvider } from '../../providers/globales/globales';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html'
})
export class TransaccionesPage {

  private id_carrito;
  public arreglo:any = [];
  constructor(public navCtrl: NavController, private usuariosPrd:UsuariosProvider,
              private ticketsPrd:TicketsProvider,private globales:GlobalesProvider) {

      this.id_carrito = this.usuariosPrd.getSucursal();
      this.ticketsPrd.getTicketsCanceladosCobrados(this.id_carrito,undefined).subscribe(datos => {
        this.arreglo = datos;
        console.log(this.arreglo);
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
