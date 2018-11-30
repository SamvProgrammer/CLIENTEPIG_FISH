import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { cuentasPage } from '../pages/cuentas/cuentas';
import { DetallecuentasPage } from '../pages/detallecuentas/detallecuentas';
import { TransaccionesPage } from '../pages/transacciones/transacciones';
import { catalogosTab } from '../pages/catalogos/catalogosTab';
import { TabsPage } from '../pages/tabs/tabs';
import { SubcatalogosPage } from '../pages/subcatalogos/subcatalogos';
import { PaginaentrarPage } from '../pages/paginaentrar/paginaentrar';
import { UsuariosPage } from '../pages/usuarios/usuarios';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { UsuariosProvider } from '../providers/usuarios/usuarios';

@NgModule({
  declarations: [
    MyApp,
    cuentasPage,
    TransaccionesPage,
    catalogosTab,
    TabsPage,
    SubcatalogosPage,
    PaginaentrarPage,
    UsuariosPage,
    DetallecuentasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    cuentasPage,
    TransaccionesPage,
    catalogosTab,
    TabsPage,
    SubcatalogosPage,
    PaginaentrarPage,
    UsuariosPage,
    DetallecuentasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    UsuariosProvider
  ]
})
export class AppModule {}
