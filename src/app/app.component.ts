import { Component } from '@angular/core';
import { Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { PaginaentrarPage } from '../pages/paginaentrar/paginaentrar';

import { LoginProvider } from '../providers/login/login';
import { UsuariosPage } from '../pages/usuarios/usuarios';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = PaginaentrarPage;
  rootPage2:any = TabsPage;
  usuarios:any = UsuariosPage;
  inicio:any=TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private prdVerificaEntrar:LoginProvider,private menuCtrl:MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
  }

  public verificaEntrar():boolean{
    return this.prdVerificaEntrar.getEntrar();
  }

  public verificaRol():boolean{
      return true; 
  }

  public openPage(pagina){
    this.menuCtrl.close();
    this.rootPage2 = pagina;
  }
}
