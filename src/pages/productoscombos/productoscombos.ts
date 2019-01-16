import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,ToastController,FabContainer} from 'ionic-angular';
import { CombosProvider } from '../../providers/combos/combos';
import { ProductoscombosAddPage } from '../productoscombos-add/productoscombos-add';

/**
 * Generated class for the ProductoscombosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-productoscombos',
  templateUrl: 'productoscombos.html',
})
export class ProductoscombosPage {

  public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private combosPrd:CombosProvider,private alertaCtrl:AlertController,private toasCtrl:ToastController) {
    this.trerCombos();
  }

  ionViewDidLoad() {
    this.trerCombos();
  }

 public trerCombos():any{
            this.combosPrd.getCombos().subscribe(datos => {this.arreglo = datos;});
 }

  ionViewDidEnter(){
    this.trerCombos();

  }

  public actualizando(refresher): any {
    this.combosPrd.getCombos().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public agregar(fab:FabContainer){
    fab.close();
    this.navCtrl.push(ProductoscombosAddPage,{boton:"Agregar"});
}

public actualizar(obj:any){
  this.navCtrl.push(ProductoscombosAddPage,{parametro:obj,boton:"Actualizar"});
}

public eliminar(obj){
   let id = obj.id_combo;
   let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
    this.combosPrd.eliminarCombos(id).subscribe(resp => {
      this.combosPrd.getCombos().subscribe(res => {
        this.arreglo = res;
      });
      let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
      toas.present();
   });

   }},"Cancelar"]});
   

   alerta.present();

}

}
