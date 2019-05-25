import { Component } from '@angular/core';

import { cuentasPage } from '../cuentas/cuentas';
import { TransaccionesPage } from '../transacciones/transacciones';
import { catalogosTab } from '../catalogos/catalogosTab';
import { DetallecocineroPage } from '../detallecocinero/detallecocinero';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = catalogosTab;
  tab2Root = cuentasPage;
  tab3Root = TransaccionesPage;
  tab4Root = DetallecocineroPage;
  constructor(private usuariosPrd:UsuariosProvider) {

  }

  public bar():boolean{
    return this.usuariosPrd.activarBar() == true;
  }
  public catalogos():boolean{
    return this.usuariosPrd.activarCatalogos() == true;
  }
  public cocina():boolean{
    return this.usuariosPrd.activarCocina() == true;
  }
  public transacciones():boolean{
    return this.usuariosPrd.activarTransacciones() == true;
  }
  public cuentas():boolean{
    return this.usuariosPrd.activarCuentas() == true;
  }
}
