import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { CombosProvider } from '../../providers/combos/combos';
import { GlobalesProvider } from '../../providers/globales/globales';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

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
  private notificar = -1;
  private id_sucursal;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ticketPrd: TicketsProvider,
    private loginPrd: LoginProvider, private alerta: AlertController, private toasCtrl: ToastController,
    private combosPrd: CombosProvider,private globales:GlobalesProvider,private usuariosPrd:UsuariosProvider) {

      this.id_sucursal = usuariosPrd.getSucursal();
      this.ticketPrd.notificaciones(this.id_sucursal,1).subscribe(datos => {
        if(this.arreglo.lenght != datos.length){
          this.hacerSonar();
      }
        this.arreglo = datos;
        this.ultimamodificacion = new Date();
        console.log("Este es lo que recibe el cocinero");
        console.log(this.arreglo);
      });
  }


  ionViewDidEnter() {
    setTimeout(() => {
      this.ticketPrd.getNotificacion().subscribe(datosnotificar => {
        if (datosnotificar.notificar != this.notificar) {
          this.ticketPrd.notificaciones(this.id_sucursal,1).subscribe(datos => {
            if(this.arreglo.lenght != datos.length){
                this.hacerSonar();
            }
            this.arreglo = datos;
            this.ultimamodificacion = new Date();
            this.notificar = datosnotificar.notificar;
          });
        } else {
          let ahora: any = new Date();

          var diferencia = ahora - this.ultimamodificacion;
          diferencia /= 1000;
          diferencia = Math.floor(diferencia / 60);
          this.minutos = Math.round(diferencia % 60);
          if (this.minutos >= 1) {
            this.ticketPrd.notificaciones(this.id_sucursal,1).subscribe(datos => {
              if(this.arreglo.lenght != datos.length){
                this.hacerSonar();
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
    this.ticketPrd.notificaciones(this.id_sucursal,1).subscribe(datos => {
      if(this.arreglo.lenght != datos.length){
        this.hacerSonar();
    }
      this.arreglo = datos;
      this.ultimamodificacion = new Date();
      console.log("Este es lo que recibe el cocinero");
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

    console.log(enviarObj);

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

  public salir(){
    this.globales.cerrarAplicacion();
  }



  public hacerSonar(){
    let audio = new Audio();
    audio.src = "../../assets/audios/notificacion.mp3";
    audio.load();
    audio.play();
  }
}
