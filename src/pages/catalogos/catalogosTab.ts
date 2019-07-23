import { Component } from '@angular/core';
import { NavController,FabContainer } from 'ionic-angular';
import { SubcatalogosPage } from '../subcatalogos/subcatalogos';
import { LoginProvider } from '../../providers/login/login';
import { ProductoscategoriasProvider } from '../../providers/productoscategorias/productoscategorias';
import { CatalogoscombosypromocionesPage } from '../catalogoscombosypromociones/catalogoscombosypromociones';
import { GlobalesProvider } from '../../providers/globales/globales';

@Component({
  selector: 'page-catalogos',
  templateUrl: 'catalogos.html'
})
export class catalogosTab {

  public arreglo:any = [];

  constructor(public navCtrl: NavController,private login:LoginProvider,private productoPrd:ProductoscategoriasProvider,
  private globales:GlobalesProvider) {
    this.productoPrd.getCategorias().subscribe(datos => {
        this.arreglo = datos;
    });
  }


  public clickimagen(numero):any{
    switch(numero){
       case "combos":
       this.navCtrl.push(CatalogoscombosypromocionesPage,{'tipo':'combos'});
       break;
       case "promociones":
       this.navCtrl.push(CatalogoscombosypromocionesPage,{'tipo':'promociones'});
       break;
       default:
       this.navCtrl.push(SubcatalogosPage,{'obj':numero});
       break;
    }
  }

  public subcatalogo(id){
    this.navCtrl.push(SubcatalogosPage,{'obj':id});
  }

  public ingresarSistema(fab:FabContainer):any{
    fab.close();
    
  }

  public salir(){
    this.globales.cerrarAplicacion();
  }
}
