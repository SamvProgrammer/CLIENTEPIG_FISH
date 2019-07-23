import { Component } from '@angular/core';
import { Platform, MenuController, AlertController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { TabsPage } from '../pages/tabs/tabs';
import { PaginaentrarPage } from '../pages/paginaentrar/paginaentrar';

import { LoginProvider } from '../providers/login/login';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { HistorialPage } from '../pages/historial/historial';
import { InventarioPage } from '../pages/inventario/inventario';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { ProductosPage } from '../pages/productos/productos';
import { CajaPage } from '../pages/caja/caja';

import { UsuariosProvider } from '../providers/usuarios/usuarios';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = PaginaentrarPage;
  usuarios: any = UsuariosPage;
  inicio: any = TabsPage;
  sucursales: any = SucursalesPage;
  historial: any = HistorialPage;
  inventario: any = InventarioPage;
  pedidos: any = PedidosPage;
  configuracion: any = ConfiguracionPage;
  productos: any = ProductosPage;
  caja:any = CajaPage;

  constructor(platform: Platform, public androidPermissions: AndroidPermissions, statusBar: StatusBar, splashScreen: SplashScreen,
    private prdVerificaEntrar: LoginProvider, private menuCtrl: MenuController, private alerta: AlertController,
    private toasCtrl: ToastController,private usuariosPrd:UsuariosProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });

    this.usuariosPrd.guardarUsuario({ menu: false }, false);

    if (platform.is('cordova')) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
        .then(success => {

        },
          err => {

          });

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
    }


    
  }



 
  public openPage(pagina) {
    this.menuCtrl.close();
    this.rootPage = pagina;
  }

  public salir() {

    console.log("Metodo para salir");
  }

  
  public activaMenu(): boolean {
    return this.usuariosPrd.activarMenu() == true;
  }
}
