import { Component } from '@angular/core';

import { cuentasPage } from '../cuentas/cuentas';
import { TransaccionesPage } from '../transacciones/transacciones';
import { catalogosTab } from '../catalogos/catalogosTab';
import { DetallecocineroPage } from '../detallecocinero/detallecocinero';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = catalogosTab;
  tab2Root = cuentasPage;
  tab3Root = TransaccionesPage;
  tab4Root = DetallecocineroPage;
  constructor() {

  }
}
