import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController,ToastController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';

/**
 * Generated class for the DetallecuentasResumenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-detallecuentas-resumen',
  templateUrl: 'detallecuentas-resumen.html',
})
export class DetallecuentasResumenPage {

  public arreglo: any = [];
  private id_ticket;
  public total = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private ticketsPrd: TicketsProvider, private alertCtrl: AlertController,private toasCtrl:ToastController) {

    this.id_ticket = this.navParams.get("id_ticket");
    this.ticketsPrd.getTicketsDetalleAgrupado(this.id_ticket).subscribe(datos => {
      this.arreglo = datos;
      for (let i of datos) {
        console.log(i.precio_total);
        this.total = this.total + i.precio_total;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallecuentasResumenPage');
  }


  public salir() {
    this.viewCtrl.dismiss();
  }

  public cobrar(): any {
    let alerta = this.alertCtrl.create({
      title: "Efectivo", inputs: [{ placeholder: "Efectivo", type: "number", name: "datos" }],
      buttons: [{
        text: "Cobrar", handler: datos => {
          let cantidad = datos.datos;
          let objEnviar = {
              id_ticket:this.id_ticket,
              total:this.total
          };

          this.ticketsPrd.cobrarTicket(objEnviar).subscribe(datos => {
              let toas = this.toasCtrl.create({message:datos.respuesta,duration:1000});
              toas.present();
          });
        }
      }]
    });

    alerta.present();
  }

}
