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
import { InventariosPage } from '../pages/inventario/inventario';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { ProductosPage } from '../pages/productos/productos';
import { CajaPage } from '../pages/caja/caja';
import { TelefonosPage } from '../pages/telefonos/telefonos';

import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { Storage } from '@ionic/storage';
import { GlobalesProvider } from '../providers/globales/globales';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = PaginaentrarPage;
  usuarios: any = UsuariosPage;
  inicio: any = TabsPage;
  sucursales: any = SucursalesPage;
  historial: any = HistorialPage;
  inventario: any = InventariosPage;
  pedidos: any = PedidosPage;
  configuracion: any = ConfiguracionPage;
  productos: any = ProductosPage;
  caja:any = CajaPage;
  telefono:any = TelefonosPage;

  constructor(platform: Platform, public androidPermissions: AndroidPermissions, statusBar: StatusBar, splashScreen: SplashScreen,
    private prdVerificaEntrar: LoginProvider, private menuCtrl: MenuController, private alerta: AlertController,
    private toasCtrl: ToastController,private usuariosPrd:UsuariosProvider,private globales:GlobalesProvider,
    private storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.get("configuraciones").then(resultado => {
        this.globales.setConfiguraciones(resultado);
      });

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

  public activaInicio():boolean{
    return this.usuariosPrd.inicio();
  }

  public activaUsuarios():boolean{
    return this.usuariosPrd.usuarios();
  }

  public activaSucursales():boolean{
    return this.usuariosPrd.sucursales();
  }

  public activaProductos():boolean{
    return this.usuariosPrd.productos();
  }

  public activaCaja():boolean{
    return this.usuariosPrd.caja();
  }

  public activaHistorial():boolean{
    return this.usuariosPrd.historial_cuentas();
  }

  public activaInventario():boolean{
    return this.usuariosPrd.inventario();
  }

  public activaPedidos():boolean{
    return this.usuariosPrd.pedidos();
  }

  public activaConfiguraciones():boolean{
    return this.usuariosPrd.configuraciones();
  }

  public activaPromociones():boolean{
    return this.usuariosPrd.promociones();
  }


}
