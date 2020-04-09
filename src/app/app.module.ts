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
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Camera } from '@ionic-native/camera';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { IonicStorageModule } from '@ionic/storage';
import { CallDirectory } from '@ionic-native/call-directory';
import { Contacts } from '@ionic-native/contacts';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {PayPal} from '@ionic-native/paypal';

import{PaypalPage} from '../pages/paypal/paypal';
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
import { InventariosPage } from '../pages/inventario/inventario';
import { InventariosAddPage } from '../pages/inventarios-add/inventarios-add';
import { AjusteInventarioPage } from '../pages/ajuste-inventario/ajuste-inventario';
import { ControlMovimientoPage } from '../pages/control-movimiento/control-movimiento';
import { AgregaMobimientoPage } from '../pages/agrega-mobimiento/agrega-mobimiento';
import { EnlaceProductoinventarioPage } from '../pages/enlace-productoinventario/enlace-productoinventario';
import { EnlaceProductoinventarioAddPage } from '../pages/enlace-productoinventario-add/enlace-productoinventario-add';
import { EnlaceProductodetalleinventarioPage } from '../pages/enlace-productodetalleinventario/enlace-productodetalleinventario';
import { PaginaentrarRolesPage } from '../pages/paginaentrar-roles/paginaentrar-roles';
import { CajaPage } from '../pages/caja/caja';
import { CajaCortePage } from '../pages/caja-corte/caja-corte';
import { CajaMesasPage } from '../pages/caja-mesas/caja-mesas';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';
import { BluetoothDispositivosPage } from '../pages/bluetooth-dispositivos/bluetooth-dispositivos';
import { ProductosproductosCategoriasPage } from '../pages/productosproductos-categorias/productosproductos-categorias';
import { CuentasDetalleAntesdeenviarPage } from '../pages/cuentas-detalle-antesdeenviar/cuentas-detalle-antesdeenviar';
import { UsuariosAddSubmenuPage } from '../pages/usuarios-add-submenu/usuarios-add-submenu';
import { DetallecuentasProductosMixtasPage } from '../pages/detallecuentas-productos-mixtas/detallecuentas-productos-mixtas';
import { CaluladoraInsumosPage } from "../pages/caluladora-insumos/caluladora-insumos";
import { AgregaProductoPage } from '../pages/agrega-producto/agrega-producto';
import { TelefonosPage } from '../pages/telefonos/telefonos';
import { PromocionesqrPage } from '../pages/promocionesqr/promocionesqr';
import { ReportesventasPage } from '../pages/reportesventas/reportesventas';
 
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
import { GlobalesProvider } from '../providers/globales/globales';
import { ImpresionesProvider } from '../providers/impresiones/impresiones';
import { ReportesProvider } from '../providers/reportes/reportes';
import { CategoriasProvider } from '../providers/categorias/categorias';
import { CortecajaProvider } from '../providers/cortecaja/cortecaja';


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
    InventariosPage,
    InventariosAddPage,
    ControlMovimientoPage,
    AjusteInventarioPage,
    AgregaMobimientoPage,
    EnlaceProductoinventarioPage,
    EnlaceProductoinventarioAddPage,
    EnlaceProductodetalleinventarioPage,
    PaginaentrarRolesPage,
    CajaPage,
    CajaCortePage,
    CajaMesasPage,
    BluetoothPage,
    BluetoothDispositivosPage,
    ProductosproductosCategoriasPage,
    CuentasDetalleAntesdeenviarPage,
    UsuariosAddSubmenuPage,
    DetallecuentasProductosMixtasPage,
    CaluladoraInsumosPage,
    AgregaProductoPage,
    TelefonosPage,
    PromocionesqrPage,
    ReportesventasPage,
    PaypalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),

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
    InventariosPage,
    InventariosAddPage,
    ControlMovimientoPage,
    AjusteInventarioPage,
    AgregaMobimientoPage,
    EnlaceProductoinventarioPage,
    EnlaceProductoinventarioAddPage,
    EnlaceProductodetalleinventarioPage,
    PaginaentrarRolesPage,
    CajaPage,
    CajaCortePage,
    CajaMesasPage,
    BluetoothPage,
    BluetoothDispositivosPage,
    ProductosproductosCategoriasPage,
    CuentasDetalleAntesdeenviarPage,
    UsuariosAddSubmenuPage,
    DetallecuentasProductosMixtasPage,
    CaluladoraInsumosPage,
    AgregaProductoPage,
    TelefonosPage,
    PromocionesqrPage,
    ReportesventasPage,
PaypalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
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
    InventarioProvider,
    GlobalesProvider,
    ImpresionesProvider,
    BluetoothSerial,
    Camera,
    ReportesProvider,
    DocumentViewer,
    File,
    FileTransfer,
    CategoriasProvider,
    CortecajaProvider,
    CallDirectory,
    Contacts,
    InAppBrowser,
    PayPal
  ]
})
export class AppModule { }
