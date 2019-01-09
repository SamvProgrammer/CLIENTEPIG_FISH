import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,FabContainer,AlertController,ToastController} from 'ionic-angular';
import { TicketsProvider } from '../../providers/tickets/tickets';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,
  private alerta:AlertController,private toasCtrl:ToastController,
  private tickPrd:TicketsProvider) {
    tickPrd.getTickets(6).subscribe(datos => {
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
          let toaslet = this.toasCtrl.create({message:"Agregado a cuentas",duration:1500});
          toaslet.present();
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
