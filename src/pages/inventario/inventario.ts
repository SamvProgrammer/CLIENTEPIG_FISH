import { Component } from '@angular/core';
import { IonicPage, NavController,FabContainer, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { InventarioProvider } from '../../providers/inventario/inventario';
import { InventariosAddPage } from '../inventarios-add/inventarios-add';
import {AjusteInventarioPage} from '../ajuste-inventario/ajuste-inventario';
import {ControlMovimientoPage} from '../control-movimiento/control-movimiento';
import {CaluladoraInsumosPage} from '../caluladora-insumos/caluladora-insumos';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';


@Component({
  selector: 'page-inventarios',
  templateUrl: 'inventario.html',
})
export class InventariosPage {
  private arreglo: any = [];
 private id_sucursal;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private inventarioPrd: InventarioProvider,private alertaCtrl:AlertController,
  private toasCtrl:ToastController,private usuariosPrd:UsuariosProvider,
  private modalCtrl: ModalController,private parametros: NavParams) {

    

  }

  ionViewDidEnter() {
    this.id_sucursal = this.usuariosPrd.getSucursal();
    this.inventarioPrd.gets(this.id_sucursal).subscribe(datos => {
      this.arreglo = datos;
    });
  }
  public desglose(obj:any) {
    let modal = this.modalCtrl.create(ControlMovimientoPage,{valorEnviado:obj});
    modal.present();
    
  }

  public agregar(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(InventariosAddPage, { boton: "Agregar" })
  }

  public ajustes(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(AjusteInventarioPage, { boton: "Agregar" })
  }
  public calculadora(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(CaluladoraInsumosPage, { boton: "Agregar" })
  }

  public actualizando(refresher): any {
    
    this.inventarioPrd.gets(this.id_sucursal).subscribe(res => {
      this.arreglo = res;
      refresher.complete();
    });
  }

  public actualizar(obj:any){
    this.navCtrl.push(InventariosAddPage,{parametro:obj,boton:"Actualizar"});
  }

  public eliminar(obj){
    let id = obj.id_inventario;
    let alerta = this.alertaCtrl.create({title:"Aviso",subTitle:"¿Deseas eliminar el registro?",buttons:[{text:"Aceptar",handler:()=>{
     this.inventarioPrd.eliminar(id).subscribe(resp => {
       this.inventarioPrd.gets(this.id_sucursal).subscribe(res => {
         this.arreglo = res;
       });
       let toas = this.toasCtrl.create({message:"Registro Eliminado",duration:1500});
       toas.present();
    });

    }},"Cancelar"]});
    

    alerta.present();

 }




}
