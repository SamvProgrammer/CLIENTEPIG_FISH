import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the ReportesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportesProvider {

  public ruta:string="";
  constructor(public http: HttpClient) {
    this.ruta = direcciones.reportes;
  }

  public getHistoricoCuentas(id_sucursal):Observable<any>{
    let dire = this.ruta+"/ticket/"+id_sucursal;
    return this.http.get(dire);    
  }


  public getVentaTotalProducto(id_sucursal,fecha1,fecha2):Observable<any>{
    let dire = this.ruta+"/ticket/"+id_sucursal+"/fechas/"+fecha1+"/"+fecha2;
    return this.http.get(dire);    

  }

}
