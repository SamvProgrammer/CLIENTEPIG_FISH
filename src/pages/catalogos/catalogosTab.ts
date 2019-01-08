import { Component } from '@angular/core';
import { NavController,FabContainer } from 'ionic-angular';
import { SubcatalogosPage } from '../subcatalogos/subcatalogos';
import { LoginProvider } from '../../providers/login/login';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';

@Component({
  selector: 'page-catalogos',
  templateUrl: 'catalogos.html'
})
export class catalogosTab {

  public arreglo:any = [];

  constructor(public navCtrl: NavController,private login:LoginProvider,private productoPrd:ProductoscategoriasProvider) {
    this.productoPrd.getCategorias().subscribe(datos => {
        this.arreglo = datos;
    });
  }


  public clickimagen(numero):any{

    this.navCtrl.push(SubcatalogosPage,{'obj':numero});
  }

  public ingresarSistema(fab:FabContainer):any{
    fab.close();
    this.login.entrarSistema();
  }

  public salir(){
    this.login.setEntrar(false);
  }
}
