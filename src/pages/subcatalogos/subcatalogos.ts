import { Component } from '@angular/core';
import { NavController, NavParams,FabContainer ,ModalController} from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ProductosProvider } from '../../providers/productos/productos';
import { SubcatalogosOrdenPage } from './../subcatalogos-orden/subcatalogos-orden';

@Component({
  selector: 'page-subcatalogos',
  templateUrl: 'subcatalogos.html',
})
export class SubcatalogosPage {
  
public identificador:any = 0;
public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private login: LoginProvider,
              private productosPrd:ProductosProvider,private modalCtrl:ModalController) {
     this.identificador =  this.navParams.get("obj");
     this.productosPrd.getProductosCategoria(this.identificador).subscribe(datos => {
        this.arreglo = datos;
     });
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }

  public agregarOrden(obj):any{
    let modal = this.modalCtrl.create(SubcatalogosOrdenPage,{parametro:obj});    
    modal.present();
  }
    
}
