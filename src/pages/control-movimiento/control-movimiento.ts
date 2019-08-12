import { Component } from '@angular/core';
import { IonicPage, NavController, FabContainer, NavParams, AlertController, ToastController, ModalController ,ViewController} from 'ionic-angular';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
/**
 * Generated class for the ControlMovimientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-control-movimiento',
  templateUrl: 'control-movimiento.html',
})
export class ControlMovimientoPage {
  private variable;
  public arreglo: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private inventarioPrd: InventarioProvider, private alertaCtrl: AlertController,
    private toasCtrl: ToastController,
    private modalCtrl: ModalController, private parametros: NavParams,private viewCtrl:ViewController,private usuariosPrd:UsuariosProvider) {

    this.variable = this.parametros.get("valorEnviado");


    let id_inventario = this.variable["id_inventario"];

    let id_sucursal = this.usuariosPrd.getSucursal();
    this.inventarioPrd.getHistorialInventario(id_inventario,id_sucursal).subscribe(datos => {
      this.arreglo = datos;
      console.log("Peticion del webservices");
      console.log(this.arreglo);
    });
  }



  ionViewDidLoad() {


  }


  public salir(){
      this.viewCtrl.dismiss();
  }

}
