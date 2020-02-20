import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController,LoadingController } from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { Vibration } from '@ionic-native/vibration';
import { SMS } from '@ionic-native/sms';
import { CurrencyPipe } from '@angular/common';
import { GooglePlus } from '@ionic-native/google-plus';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { GlobalesProvider } from '../../providers/globales/globales';




@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {


  private billete;
  private arreglo: any = [];
  private total = 0;
  private folio = 0;
  private nombre_ticket = "";
  private id_mesa = "";
  private id_token = "";
  private nombre_sucursal = "";
  private promociones:any = [];
  private totalNeto = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ticketsPrd: TicketsProvider,
    private sucursalPrd: CarritoProvider,
    private Vibrador: Vibration,
    private alerta: AlertController,
    private toasCtrl: ToastController,
    private sms: SMS,
    private currency: CurrencyPipe,
    private google: GooglePlus,
    public http: HttpClient,
    private usuariosPrd: UsuariosProvider,
    private bt: BluetoothSerial,
    private loadCtrl:LoadingController,
    private globales:GlobalesProvider) {
    this.billete = navParams.get("billete");
    let id_ticket = navParams.get("id_ticket");
    console.log("Aqui se recibe los parametros del preticket");
    console.log(id_ticket);
    ticketsPrd.getTicketsDetalleAgrupadoTicketFinal(id_ticket).subscribe(resultado => {
      let datos = resultado.resultado;
      this.promociones = resultado.promociones;
      this.arreglo = datos;
      console.log(this.arreglo);
      for (let i of datos) {
        this.total = this.total + i.precio_total;
        this.folio = i.id_folio;
        this.id_mesa = i.nombre_ticket;
      }
      
      let totalPromociones = 0;
      let totalProductosPromociones = 0;
      for(let item of this.promociones){
          totalPromociones = totalPromociones + item.total;
          
          for(let producto of item.productos){
            totalProductosPromociones = totalProductosPromociones + producto.total;
          }
      }

      this.totalNeto = this.total - totalProductosPromociones;
      this.totalNeto = this.totalNeto + totalPromociones;
    });

    let id_sucursal = usuariosPrd.getSucursal();
    this.sucursalPrd.getCarritosEspecifico(id_sucursal).subscribe(datos => {
      this.nombre_sucursal = datos.nombre;
    });

    if (this.billete) {
      this.Vibrador.vibrate(1000);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketPage');
  }

  public cerrar1() {
    this.navCtrl.pop();
  }

  public enviar(): any {
    let opciones = this.alerta.create({
      title: "Modo de envío",
      message: "Seleccione la manera que se enviara el ticket",
      inputs: [{
        type: "radio",
        value: "1",
        name: "email",
        label: "Correo Electrónico",
        checked: true
      },
      {
        type: "radio",
        value: "2",
        name: "sms",
        label: "Mensaje de Texto"
      },
      {
        type: "radio",
        value: "3",
        name: "impresora",
        label: "Impresora"
      }], buttons: [{
        text: "Aceptar", handler: datos => {

          let mensaje = "";

          let sucursal = "Sucursal: " + this.nombre_sucursal + "\n";
          let cuenta = "N° Folio: " + this.folio + "\n";
          let lineas = "-----------------------\n";
          let lineas2 = "Productos consumidos\n";
          let productos = "";
          let total = "Total: " + this.currency.transform(this.total);
          for (let item of this.arreglo) {
            let cantidad = item.cantidad;
            let nombre = item.nombre;
            let unitario = this.currency.transform(item.unitario);
            let precioTotalCantidad = this.currency.transform(item.precio_total);


            productos = productos + cantidad + " " + nombre + " " + precioTotalCantidad + "\n";
          }



          mensaje = sucursal + cuenta + lineas + lineas2 + productos + lineas + total + "\n\n\n";
  
          

          if (datos == 1) {//Este es para envíar el ticket por correo electrónico de gmail...
            this.google.login({
              scopes: 'https://www.googleapis.com/auth/gmail.send https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify'
            })
              .then(res => {
                console.log("ENTRA PARA ENVIAR CORREO");
                console.log(JSON.stringify(res));
                let alert = this.alerta.create({
                  title: "Correo Electrónico", message: "Ingresa el correo electrónico",
                  inputs: [{ type: "text", placeholder: "Correo Eletrónico", name: "correo" }],
                  buttons: [{
                    text: "Aceptar", handler: parametro => {
                      let id_token = res.accessToken;
                      const httpOptions = {
                        headers: new HttpHeaders({
                          'Content-Type': 'message/rfc822',
                          'Authorization': 'Bearer ' + id_token
                        })
                      };


                      let usuarioEnviar = res.email;
                      let userId = res.userId;
                      let direccion = "https://www.googleapis.com/upload/gmail/v1/users/" + userId + "/messages/send?uploadType=multipart";

                      let ms1 = "From: AppMovil <" + usuarioEnviar + ">\n";
                      ms1 = ms1 + "to: " + parametro.correo + "\n";
                      ms1 = ms1 + "Subject: Ticket de compra AppsMovil\n";
                      ms1 = ms1 + "MIME-Version: 1.0\n";
                      ms1 = ms1 + "Content-Type: multipart/mixed;\n";
                      ms1 = ms1 + "        boundary=\"limite1\"\n\n";
                      ms1 = ms1 + "En esta sección se prepara el mensaje\n\n";
                      ms1 = ms1 + "--limite1\n";
                      ms1 = ms1 + "Content-Type: text/plain\n\n";
                      ms1 = ms1 + mensaje;

                      this.http.post(direccion, ms1, httpOptions).subscribe(datos => {
                        let toas = this.toasCtrl.create({ message: "Mensaje envíado correctamente", duration: 1500 });
                        toas.present();
                      }, error => {
                        let toas = this.alerta.create({ message: JSON.stringify(error) });
                        toas.present();
                      });
                    }
                  }]
                });
                alert.present();


              })
              .catch(err => {
                console.log("ENTRA AL ERROR");
                console.log(JSON.stringify(err));
                this.navCtrl.pop();
              });
          } else if (datos == 2) {//Este es para envíar el ticket por medio de un mensaje sms
            let ventanaCelular = this.alerta.create({
              title: "Aviso",
              message: "Número de celular",
              inputs: [{ type: "number", placeholder: "Número de celular", name: "celular" }],
              buttons: [{
                text: "Enviar", handler: datos => {
                  if (datos.celular.length == 10) {
                    this.sms.send(datos.celular, mensaje);
                    let toas = this.toasCtrl.create({ message: "Mensaje enviado correctamente", duration: 1500 });
                    this.navCtrl.pop();
                    toas.present();

                    let ale = this.alerta.create({message:"¿Deseas guardar el teléfono en la base?",buttons:[{text:"Si",handler:()=>{
                      let obj = {id_folio:this.folio,telefono:datos.celular};
                      this.ticketsPrd.guardarTelefono(obj).subscribe(mensajetelefono =>{
                            let toast = this.toasCtrl.create({message:"El teléfono se a guardado exitosamente",duration:1500});
                            toast.present();
                      });
                    }},"No"]});

                    ale.present();
                  } else {
                    let toas = this.toasCtrl.create({ message: "Error en número de celular, intente de nuevo", duration: 1500 });
                    toas.present();
                  }
                }
              }]
            });
            ventanaCelular.present();
          } else {
              let loading = this.loadCtrl.create({content:"Imprimiendo"});
              loading.present();
              console.log(mensaje);
              this.globales.conectarCajero(mensaje).then((correcto)=>{
                loading.dismiss();
              }).catch(erro =>{
                loading.dismiss();
              });
          }
        }
      }]
    });


    opciones.present();
  }

}
