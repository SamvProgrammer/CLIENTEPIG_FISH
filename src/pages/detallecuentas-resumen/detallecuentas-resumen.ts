import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';
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
  public promociones:any = [];
  public totalPromocion = 0;
  public productosDescontar = 0;
  public totalNeto = 0;


  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private ticketsPrd: TicketsProvider, private alertCtrl: AlertController, private toasCtrl: ToastController) {

      this.id_ticket = this.navParams.get("id_ticket");
      this.ticketsPrd.getTicketsDetalleAgrupado(this.id_ticket).subscribe(resultado => {
        let datos = resultado.resultado;
        this.promociones = resultado.promociones;
    
        this.arreglo = datos;
        for (let i of datos) {        
          this.total = this.total + i.precio_total;
        }
  
  
        console.log(this.promociones);
  
        for(let item of this.promociones){
          this.totalPromocion = this.totalPromocion + (item.totalPromocion * item.precio);
          for(let producto of item.productos){
            this.productosDescontar = this.productosDescontar + producto.total;
          }
        }
  
        this.totalNeto = this.total - this.productosDescontar;
        this.totalNeto = this.totalNeto + this.totalPromocion;
        
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallecuentasResumenPage');
  }


  public salir() {
    this.viewCtrl.dismiss();
  }

  public cobrar(): any {

    let tipoPago = this.alertCtrl.create({
      title:"Tipo de pago",
      message:"Seleccionar el tipo de pago",
      inputs:[
      {type:"radio",label:"Efectivo",value:"E",checked:true},
      {type:"radio",label:"Cortesía",value:"C"},
      {type:"radio",label:"Tarjeta de crédito / débito",value:"T"},
      {type:"radio",label:"Otros",value:"O"}]
    ,buttons:[{text:"Cancelar"},{text:"Aceptar",handler: radio =>{
      let alerta = this.alertCtrl.create({
        title: "Cantidad", inputs: [{ placeholder: "Cantidad", type: "number", name: "cantidad" }],
        buttons: [{
          text: "Cobrar", handler: datos => {
            let cantidad = datos.cantidad;
            if(Number(cantidad) >= Number(this.total)){
              let objEnviar = {
                id_ticket: this.id_ticket,
                total: this.total,
                tipo_pago:radio
              };
    
              this.ticketsPrd.cobrarTicket(objEnviar).subscribe(datos => {
                let toas = this.toasCtrl.create({ message: datos.respuesta, duration: 1000 });
                toas.present();
                this.viewCtrl.dismiss({ id_ticket: objEnviar.id_ticket,billete:cantidad });
              });
  
            }else{
                let alerta = this.alertCtrl.create({title:"Monto incorrecto",subTitle:"El monto ingresado debe ser mayor o igual al monto gastado",
              buttons:[{text:"Aceptar",handler:()=>{}}]});
                alerta.present();
            }
          }
        }]
      });
      alerta.present();
    }}]});
    tipoPago.present();


  }

}
