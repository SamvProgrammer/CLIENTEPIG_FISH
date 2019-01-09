import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,FabContainer,AlertController,ToastController,ModalController} from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';
import { LoginProvider } from '../../providers/login/login';


/**
 * Generated class for the SubcatalogosOrdenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-subcatalogos-orden',
  templateUrl: 'subcatalogos-orden.html',
})
export class SubcatalogosOrdenPage {

  public arreglo:any = [];
  private id_carrito;
  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
  private alerta:AlertController,private toasCtrl:ToastController,
  private tickPrd:TicketsProvider,private loginPrd:LoginProvider,private modal:ModalController) {
    let carrito = loginPrd.getCarrito();
    this.id_carrito = carrito;
    tickPrd.getTickets(carrito).subscribe(datos => {
      console.log(carrito);
      this.arreglo = datos;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubcatalogosOrdenPage');
  }

  public salir() {
    this.viewCtrl.dismiss();
  }
  public agregarCuenta(fab: FabContainer) {
    fab.close();
    let alerta1 = this.alerta.create({
      title: 'Agregando',
      subTitle: 'Cuenta nueva',
      inputs: [{
        name: 'cuenta',
        placeholder: 'Ingresar cuenta'
      }],
      buttons: [{
        text: "Ingresar",
        handler: datos => {
          let identificadorCuenta = datos.cuenta;
          let objTicket = {
             id_user:12,
             nombre:identificadorCuenta,
             id_carrito:this.loginPrd.getCarrito()
          };
          this.tickPrd.getTickets(this.id_carrito).subscribe(d1 => {
            console.log(d1);
            this.arreglo = d1;
           });
          this.tickPrd.insert(objTicket).subscribe(datos => {
            let t1 = this.toasCtrl.create({message:datos.respuesta,duration:1000});
            t1.present();
            this.tickPrd.getTickets(this.id_carrito).subscribe(datos => {
              this.arreglo = datos;
            });
         });
         
        }
      }]

    });
    alerta1.present();
  }

  public agregarCarrito(obj):any{
    console.log(obj);
    let a1 = this.alerta.create({title:"Cantidad:",inputs:[{placeholder:"Cantidad",type:"number",name:"cant"}]
              ,buttons:[{text:"Agregar",handler:datos=>{
                let t1 = this.toasCtrl.create({message:"Producto agregado",duration:1500});
                t1.present();
                this.viewCtrl.dismiss();
              }}]});
    a1.present();
  }
}
