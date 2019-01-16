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
import { UsuariosAddPage } from '../pages/usuarios-add/usuarios-add';
import { SucursalesPage } from '../pages/sucursales/sucursales';
import { HistorialPage } from '../pages/historial/historial';
import { InventarioPage } from '../pages/inventario/inventario';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { SucursalesAddPage } from '../pages/sucursales-add/sucursales-add';
import { ProductosPage } from '../pages/productos/productos';
import { CategoriasPage } from '../pages/productoscategorias/categorias';
import { ProductoscategoriasAddPage } from '../pages/productoscategorias-add/productoscategorias-add';
import { ProductosproductosPage } from '../pages/productosproductos/productosproductos';
import { ProductosproductosAddPage } from '../pages/productosproductos-add/productosproductos-add';
import { SubcatalogosOrdenPage } from '../pages/subcatalogos-orden/subcatalogos-orden';
import { ProductoscombosypromocionesPage } from '../pages/productoscombosypromociones/productoscombosypromociones';
import { ProductoscombosPage } from '../pages/productoscombos/productoscombos';
import { ProductospromocionesPage } from '../pages/productospromociones/productospromociones';
import { DetallecuentasProductosPage } from '../pages/detallecuentas-productos/detallecuentas-productos';
import { ProductoscombosAddPage } from '../pages/productoscombos-add/productoscombos-add';
import { ProductoscombosAddmodalproductoPage } from '../pages/productoscombos-addmodalproducto/productoscombos-addmodalproducto';
import { DetallecuentasResumenPage } from '../pages/detallecuentas-resumen/detallecuentas-resumen';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginProvider } from '../providers/login/login';
import { UsuariosProvider } from '../providers/usuarios/usuarios';
import { RolesProvider } from '../providers/roles/roles';
import { CarritoProvider } from '../providers/carrito/carrito';
import { ProductoscategoriasProvider } from '../providers/productoscategorias/productoscategorias';
import { ProductosProvider } from '../providers/productos/productos';
import { TicketsProvider } from '../providers/tickets/tickets';
import { CombosProvider } from '../providers/combos/combos';


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
    DetallecuentasPage,
    UsuariosAddPage,
    SucursalesPage,
    HistorialPage,
    InventarioPage,
    PedidosPage,
    ConfiguracionPage,
    SucursalesAddPage,
    ProductosPage,
    CategoriasPage,
    ProductoscategoriasAddPage,
    ProductosproductosPage,
    ProductosproductosAddPage,
    SubcatalogosOrdenPage,
    ProductoscombosypromocionesPage,
    ProductoscombosPage,
    ProductospromocionesPage,
    DetallecuentasProductosPage,
    ProductoscombosAddPage,
    ProductoscombosAddmodalproductoPage,
    DetallecuentasResumenPage
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
    DetallecuentasPage,
    UsuariosAddPage,
    SucursalesPage,
    HistorialPage,
    InventarioPage,
    PedidosPage,
    ConfiguracionPage,
    SucursalesAddPage,
    ProductosPage,
    CategoriasPage,
    ProductoscategoriasAddPage,
    ProductosproductosPage,
    ProductosproductosAddPage,
    SubcatalogosOrdenPage,
    ProductoscombosypromocionesPage,
    ProductoscombosPage,
    ProductospromocionesPage,
    DetallecuentasProductosPage,
    ProductoscombosAddPage,
    ProductoscombosAddmodalproductoPage,
    DetallecuentasResumenPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    UsuariosProvider,
    RolesProvider,
    CarritoProvider,
    ProductoscategoriasProvider,
    ProductosProvider,
    TicketsProvider,
    CombosProvider
  ]
})
export class AppModule {}
