import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { Vibration } from '@ionic-native/vibration';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { CurrencyPipe } from '@angular/common';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { GooglePlus } from '@ionic-native/google-plus';

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
import { PedidosPage } from '../pages/pedidos/pedidos';
import { ConfiguracionPage } from '../pages/configuracion/configuracion';
import { SucursalesAddPage } from '../pages/sucursales-add/sucursales-add';
import { ProductosPage } from '../pages/productos/productos';
import { CategoriasPage } from '../pages/productoscategorias/categorias';
import { ProductoscategoriasAddPage } from '../pages/productoscategorias-add/productoscategorias-add';
import { ProductosproductosPage } from '../pages/productosproductos/productosproductos';
import { ProductosproductosAddPage } from '../pages/productosproductos-add/productosproductos-add';
import { SubcatalogosOrdenPage } from '../pages/subcatalogos-orden/subcatalogos-orden';
import { ProductoscombosPage } from '../pages/productoscombos/productoscombos';
import { ProductospromocionesPage } from '../pages/productospromociones/productospromociones';
import { DetallecuentasProductosPage } from '../pages/detallecuentas-productos/detallecuentas-productos';
import { ProductoscombosAddPage } from '../pages/productoscombos-add/productoscombos-add';
import { ProductoscombosAddmodalproductoPage } from '../pages/productoscombos-addmodalproducto/productoscombos-addmodalproducto';
import { DetallecuentasResumenPage } from '../pages/detallecuentas-resumen/detallecuentas-resumen';
import { TicketPage } from '../pages/ticket/ticket';
import { ProductosproductoslistyoutubePage } from '../pages/productosproductoslistyoutube/productosproductoslistyoutube';
import { DetallecocineroPage } from '../pages/detallecocinero/detallecocinero';
import { CatalogoscombosypromocionesPage } from '../pages/catalogoscombosypromociones/catalogoscombosypromociones';
import { DetallescuentasCombosPage } from '../pages/detallescuentas-combos/detallescuentas-combos';
import { ReportetransaccionesPage } from '../pages/reportetransacciones/reportetransacciones';
import { InventarioPage } from '../pages/inventario/inventario';
import { InventarioAddPage } from '../pages/inventario-add/inventario-add';
import { EnlaceProductoinventarioPage } from '../pages/enlace-productoinventario/enlace-productoinventario';
import { EnlaceProductoinventarioAddPage } from '../pages/enlace-productoinventario-add/enlace-productoinventario-add';
import { EnlaceProductodetalleinventarioPage } from '../pages/enlace-productodetalleinventario/enlace-productodetalleinventario';
import { PaginaentrarRolesPage } from '../pages/paginaentrar-roles/paginaentrar-roles';
import { CajaPage } from '../pages/caja/caja';
import { CajaCortePage } from '../pages/caja-corte/caja-corte';
import { CajaMesasPage } from '../pages/caja-mesas/caja-mesas';

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
import { ApiyoutubeProvider } from '../providers/apiyoutube/apiyoutube';
import { InventarioProvider } from '../providers/inventario/inventario';


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
    PedidosPage,
    ConfiguracionPage,
    SucursalesAddPage,
    ProductosPage,
    CategoriasPage,
    ProductoscategoriasAddPage,
    ProductosproductosPage,
    ProductosproductosAddPage,
    SubcatalogosOrdenPage,
    ProductoscombosPage,
    ProductospromocionesPage,
    DetallecuentasProductosPage,
    ProductoscombosAddPage,
    ProductoscombosAddmodalproductoPage,
    DetallecuentasResumenPage,
    TicketPage,
    ProductosproductoslistyoutubePage,
    DetallecocineroPage,
    CatalogoscombosypromocionesPage,
    DetallescuentasCombosPage,
    ReportetransaccionesPage,
    InventarioPage,
    InventarioAddPage,
    EnlaceProductoinventarioPage,
    EnlaceProductoinventarioAddPage,
    EnlaceProductodetalleinventarioPage,
    PaginaentrarRolesPage,
    CajaPage,
    CajaCortePage,
    CajaMesasPage
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
    PedidosPage,
    ConfiguracionPage,
    SucursalesAddPage,
    ProductosPage,
    CategoriasPage,
    ProductoscategoriasAddPage,
    ProductosproductosPage,
    ProductosproductosAddPage,
    SubcatalogosOrdenPage,
    ProductoscombosPage,
    ProductospromocionesPage,
    DetallecuentasProductosPage,
    ProductoscombosAddPage,
    ProductoscombosAddmodalproductoPage,
    DetallecuentasResumenPage,
    TicketPage,
    ProductosproductoslistyoutubePage,
    DetallecocineroPage,
    CatalogoscombosypromocionesPage,
    DetallescuentasCombosPage,
    ReportetransaccionesPage,
    InventarioPage,
    InventarioAddPage,
    EnlaceProductoinventarioPage,
    EnlaceProductoinventarioAddPage,
    EnlaceProductodetalleinventarioPage,
    PaginaentrarRolesPage,
    CajaPage,
    CajaCortePage,
    CajaMesasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AndroidPermissions,
    LoginProvider,
    UsuariosProvider,
    RolesProvider,
    CarritoProvider,
    ProductoscategoriasProvider,
    ProductosProvider,
    TicketsProvider,
    CombosProvider,
    Vibration,
    SMS,
    CurrencyPipe,
    ApiyoutubeProvider,
    YoutubeVideoPlayer,
    GooglePlus,
    InventarioProvider
  ]
})
export class AppModule {}
