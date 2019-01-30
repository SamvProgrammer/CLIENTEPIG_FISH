import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
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
              private loginPrd:LoginProvider,private alerta:AlertController,private toasCtrl:ToastController) {
    
    this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
      this.arreglo = datos;
    });
  }
 

  ionViewDidEnter() {
    setTimeout(() => {
      this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
        this.arreglo = datos;
        console.log("puede entrar");
        this.ionViewDidEnter();
      });
    }, 1500);
}

  public actualizando(refresher): any {
    this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
      this.arreglo = datos;
      refresher.complete();
    });
  }


  public servido(obj):any{
    let enviarObj = {
      id_ticket:obj.id_ticket,
      id_producto:obj.id_producto,
      cantidad:obj.cantidad,
      servido:true
    };

    let alerta = this.alerta.create({title:"Aviso",message:"¿El producto ya fue servido?",buttons:[
      {text:"Sí",handler:()=>{
        this.ticketPrd.detallecocineroactualizar(enviarObj).subscribe(datos => {
            let toas = this.toasCtrl.create({message:datos.respuesta,duration:1500});
            toas.present();
            this.ticketPrd.detallecocinero(this.loginPrd.getCarrito()).subscribe(datos => {
              this.arreglo = datos;
            });
        });
      }},{
        text:"No"
      }
    ]});
    alerta.present();
  }

}
