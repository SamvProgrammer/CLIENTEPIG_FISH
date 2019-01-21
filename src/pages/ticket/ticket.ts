import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ToastController} from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { Vibration } from '@ionic-native/vibration';
import { SMS } from '@ionic-native/sms';
import { CurrencyPipe } from '@angular/common';
/**
 * Generated class for the TicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {


  private billete;
  private arreglo:any = [];
  private total = 0;
  private folio = 0;
  private nombre_ticket = "";
  private nombre_sucursal = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private ticketsPrd:TicketsProvider,private login:LoginProvider,
              private carritoPrd:CarritoProvider,
              private Vibrador:Vibration,
              private alerta:AlertController,
              private toasCtrl:ToastController,
              private sms: SMS,
              private currency : CurrencyPipe) {
    this.billete = navParams.get("billete");
    let id_ticket = navParams.get("id_ticket");
    ticketsPrd.getTicketsDetalleAgrupado(id_ticket).subscribe(datos=>{
      this.arreglo = datos;
      for (let i of datos) {
        this.total = this.total + i.precio_total;
        this.folio = i.id_folio;
        this.nombre_ticket = i.nombre_ticket;
      }
    });

    let id_carrito = this.login.getCarrito();
    this.carritoPrd.getCarritosEspecifico(id_carrito).subscribe(datos => {
      this.nombre_sucursal = datos.nombre;
    });

    if(this.billete){
      this.Vibrador.vibrate(1000);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

  public cerrar1(){
    this.navCtrl.pop();
  }

  public enviar():any{
     let opciones = this.alerta.create({
       title:"Modo de envío",
       message:"Seleccione la manera que se enviara el ticket",
       inputs:[{
         type:"radio",
         value:"1",
         name : "email",
         label:"Correo Electrónico",
         checked:true
       },
       {
        type:"radio",
        value:"2",
        name : "sms",
        label:"Mensaje de Texto"
      }],buttons:[{text:"Aceptar",handler:datos =>{
          if(datos == 1){
          }else{
            let ventanaCelular = this.alerta.create({
              title:"Aviso",
              message:"Número de celular",
              inputs:[{type:"number",placeholder:"Número de celular",name:"celular"}],
              buttons:[{text:"Enviar",handler:datos=>{
                 if(datos.celular.length == 10){

                  let mensaje = "";

                  let sucursal = "Sucursal: "+this.nombre_sucursal+"\n";
                  let cuenta = "N° Folio: "+this.folio+"\n";
                  let lineas = "-----------------------\n";
                  let lineas2 = "Productos consumidos\n";
                  let productos = "";
                  let total ="Total: "+ this.currency.transform(this.total);
                  for(let item of this.arreglo){
                      let cantidad = item.cantidad;
                      let nombre = item.nombre;
                      let unitario = this.currency.transform(item.unitario);
                      let precioTotalCantidad = this.currency.transform(item.precio_total);


                      productos = productos + cantidad+" "+nombre+" "+precioTotalCantidad+"\n";
                  }
                  
                  mensaje = sucursal+cuenta+lineas+lineas2+productos+lineas+total;
                  

                  this.sms.send(datos.celular, mensaje);
                  let toas = this.toasCtrl.create({message:"Mensaje enviado correctamente",duration:1500});
                  this.navCtrl.pop();
                  toas.present();
                 }else{
                    let toas = this.toasCtrl.create({message:"Error en número de celular, intente de nuevo",duration:1500});
                    toas.present();
                 }
              }}]
            });
            ventanaCelular.present();
          }
      }}]
     });


     opciones.present();
  }

}
