import { Component } from '@angular/core';
import {  NavController, NavParams,FabContainer } from 'ionic-angular';
import { LoginProvider } from '../../providers/login/login';
import { ProductosProvider } from '../../providers/productos/productos';

@Component({
  selector: 'page-subcatalogos',
  templateUrl: 'subcatalogos.html',
})
export class SubcatalogosPage {
  
public identificador:any = 0;
public arreglo:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private login: LoginProvider,
              private productosPrd:ProductosProvider) {
     this.identificador =  this.navParams.get("obj");
     this.productosPrd.getProductosCategoria(this.identificador).subscribe(datos => {
        this.arreglo = datos;
     });
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();
    this.login.entrarSistema();
  }
    
}
