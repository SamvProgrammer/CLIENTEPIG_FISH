import { Component } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
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

  public arreglo: any = [];

  constructor(public navCtrl: NavController, private login: LoginProvider, private productoPrd: ProductoscategoriasProvider,
    private globales: GlobalesProvider) {
    this.productoPrd.getCategorias().subscribe(datos => {
      for (let item of datos) {
        let nombre = item["nombre"];
        switch (nombre) {
          case "TACOS":
            item["imagen"] = "../../assets/icon/taco.png";
            break;
          case "BEBIDAS":
            item["imagen"] = "../../assets/icon/soda.png";
            break;
          case "CHAPATAS":
            item["imagen"] = "../../assets/icon/pan-de-molde.png";
            break;
          case "ENTRADAS":
            item["imagen"] = "../../assets/icon/iniciar-sesion.png";
            break;
          case "COSTRAS":
            item["imagen"] = "../../assets/icon/taco1.png";
            break;
          case "PAPAS":
            item["imagen"] = "../../assets/icon/comida.png";
            break;
          case "Postres":
            item["imagen"] = "../../assets/icon/helado.png";
            break;
          case "Kilos":
            item["imagen"] = "../../assets/icon/peso.png";
            break;
            case "Promos":
            item["imagen"] = "../../assets/icon/mejor-precio.png";
            break;
            case "Ensaladas":
            item["imagen"] = "../../assets/icon/ensalada.png";
            break;
            case "Tostadas":
            item["imagen"] = "../../assets/icon/tortilla.png";
            break;
            case "Ordenes ":
            item["imagen"] = "../../assets/icon/orden.png";
            break;
          default:
            item["imagen"] = "../../assets/icon/iconcatalogos.png";
        }
      }
      this.arreglo = datos;
    });
  }


  public clickimagen(numero): any {
    switch (numero) {
      case "combos":
        this.navCtrl.push(CatalogoscombosypromocionesPage, { 'tipo': 'combos' });
        break;
      case "promociones":
        this.navCtrl.push(CatalogoscombosypromocionesPage, { 'tipo': 'promociones' });
        break;
      default:
        this.navCtrl.push(SubcatalogosPage, { 'obj': numero });
        break;
    }
  }

  public subcatalogo(id) {
    this.navCtrl.push(SubcatalogosPage, { 'obj': id });
  }

  public ingresarSistema(fab: FabContainer): any {
    fab.close();

  }

  public salir() {
    this.globales.cerrarAplicacion();
  }
}
