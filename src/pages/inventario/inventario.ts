import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, FabContainer ,AlertController,ToastController} from 'ionic-angular';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { InventarioAddPage } from '../inventario-add/inventario-add';


/**
 * Generated class for the InventarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-inventario',
  templateUrl: 'inventario.html',
})
export class InventarioPage {

  private arreglo: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private inventarioPrd: InventarioProvider,private alertaCtrl:AlertController,
  private toasCtrl:ToastController) {
  }

  ionViewDidEnter() {
    this.inventarioPrd.gets().subscribe(datos => {
      this.arreglo = datos;
      
    });
  }

  public agregar(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(InventarioAddPage, { boton: "Agregar" })
  }

  public actualizando(refresher): any {
    this.inventarioPrd.gets().subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public actualizar(obj:any){
    this.navCtrl.push(InventarioAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
    let id = obj.id;
    let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
     this.inventarioPrd.eliminar(id).subscribe(resp => {
       this.inventarioPrd.gets().subscribe(res => {
         this.arreglo = res;
       });
       let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
       toas.present();
    });

    }},"Cancelar"]});
    

    alerta.present();

 }



}
