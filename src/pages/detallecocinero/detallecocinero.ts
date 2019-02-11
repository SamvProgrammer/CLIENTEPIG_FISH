import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { CombosProvider } from '../../providers/combos/combos';

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

  public arreglo: any = [];
  private ultimamodificacion;
  private minutos;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ticketPrd: TicketsProvider,
    private loginPrd: LoginProvider, private alerta: AlertController, private toasCtrl: ToastController,
    private combosPrd: CombosProvider) {

    this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
      for (let item of datos) {
        if (item.categoria == "COMBO") {
          combosPrd.getCombosDetalle(item.id_producto).subscribe(respu => {
            item.lista = respu;
          });
        }
      }
      this.arreglo = datos;
      this.ultimamodificacion = new Date();
    });
  }


  ionViewDidEnter() {
    setTimeout(() => {
      this.ticketPrd.getNotificacion().subscribe(datos => {
        if (datos.notificar == true) {
          this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
            for (let item of datos) {
              if (item.categoria == "COMBO") {
                this.combosPrd.getCombosDetalle(item.id_producto).subscribe(respu => {
                  item.lista = respu;
                });
              }
            }
            this.arreglo = datos;
            this.ultimamodificacion = new Date();
          });
        } else {
          let ahora: any = new Date();

          var diferencia = ahora - this.ultimamodificacion;
          diferencia /= 1000;
          diferencia = Math.floor(diferencia / 60);
          this.minutos = Math.round(diferencia % 60);
          if (this.minutos >= 1) {
            this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
              for (let item of datos) {
                if (item.categoria == "COMBO") {
                  this.combosPrd.getCombosDetalle(item.id_producto).subscribe(respu => {
                    item.lista = respu;
                  });
                }
              }
              this.arreglo = datos;
              
            });
            this.ultimamodificacion = new Date();
          }
        }
        this.ionViewDidEnter();
      });
    }, 1000);
  }

  public actualizando(refresher): any {
    this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
      for (let item of datos) {
        if (item.categoria == "COMBO") {
          this.combosPrd.getCombosDetalle(item.id_producto).subscribe(respu => {
            item.lista = respu;
          });
        }
      }
      this.arreglo = datos;
      console.log(this.arreglo);
      refresher.complete();
    });
  }


  public servido(obj): any {
    let enviarObj = {
      id_ticket: obj.id_ticket,
      id_producto: obj.id_producto,
      cantidad: obj.cantidad,
      servido: true,
      id: obj.id
    };

    let alerta = this.alerta.create({
      title: "Aviso", message: "¿El producto ya fue servido?", buttons: [
        {
          text: "Sí", handler: () => {
            this.ticketPrd.detallecocineroactualizar(enviarObj).subscribe(datos => {
              let toas = this.toasCtrl.create({ message: datos.respuesta, duration: 1500 });
              toas.present();
            });
          }
        }, {
          text: "No"
        }
      ]
    });
    alerta.present();
  }

}
