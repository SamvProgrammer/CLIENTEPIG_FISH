import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { ReportesProvider } from '../../providers/reportes/reportes';
import { direcciones } from '../../assets/direcciones';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ReportesventasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-reportesventas',
  templateUrl: 'reportesventas.html',
})
export class ReportesventasPage {
  private carrito: any = [];
  public valor1;
  public ver;
  public fecha1;
  public fecha2;

  public opcion;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sucursalPrd: CarritoProvider, private reportePrd: ReportesProvider, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    this.sucursalPrd.getCarritos().subscribe(datos => {
      this.carrito = datos;
      console.log("Esto es lo que pasa");
      console.log(this.carrito);
    });



  }


  public reporte() {

let url = "";
    switch (this.opcion) {
      case "op1":
      url = `https://docs.google.com/viewer?url=${direcciones.reportes}/ticket/${this.valor1}/fechas/${this.fecha1}/${this.fecha2}`
      console.log(url);
      this.iab.create(url,"_system");
        break;
    }

  }

}
