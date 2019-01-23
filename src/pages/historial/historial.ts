import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { TicketPage } from '../ticket/ticket';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  public arreglo: any = [];
  public arreglo2:any = [];
  public fecha;
  public gender: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private ticktPrd: TicketsProvider,
    private loginPrd: LoginProvider, private carritoPrd: CarritoProvider) {
    let idCarrito = loginPrd.getCarrito();
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    let dia: string = "";
    let mes: string = "";

    if (dd < 10) {
      dia = "0" + dd;
    } else {
      dia = "" + dd;
    }

    if (mm < 10) {
      mes = '0' + mm;
    } else {
      mes = "" + mm;
    }

    this.fecha = yyyy + '-' + mes + '-' + dia;
    this.ticktPrd.getTicketsCanceladosCobrados(idCarrito, undefined).subscribe(datos => {
      this.arreglo = datos;
    });

    this.carritoPrd.getCarritos().subscribe(datos => {
      this.arreglo2 = datos;
      this.gender = idCarrito;
      console.log(this.gender);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

  public buscar() {
    this.ticktPrd.getTicketsCanceladosCobrados(this.gender, this.fecha).subscribe(datos => {
      this.arreglo = datos;
    });
  }

  public entrarDetalle(obj){
    this.navCtrl.push(TicketPage,{id_ticket:obj.id_ticket});
  }

}
