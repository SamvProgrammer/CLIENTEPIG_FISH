import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the InventarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InventarioProvider {

  private direccion:string="";
  private direccion1:string="";
  constructor(public http: HttpClient) {
    this.direccion = direcciones.inventarios;
    this.direccion1=direcciones.insumos;
  }

  public modificarajustes(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.put(this.direccion+"/ajustes",json,httpOptions);
    
  }

  
  
  public gets(id_sucursal):Observable<any>{
    return   this.http.get(this.direccion+"/sucursal/"+id_sucursal);
  }


    public Producto(cantidad,id_producto):Observable<any>{
    return   this.http.get(this.direccion);
  }

  public insertar(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.post(this.direccion,json,httpOptions);
  }

  public modificar(obj):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    let json = JSON.stringify(obj);
    return this.http.put(this.direccion,json,httpOptions);
  }


  public eliminar(id):Observable<any>{
    return this.http.delete(this.direccion+"/"+id);
   }

   public getHistorialInventario(id_inventario,id_sucursal):Observable<any>{

    let direccionHistorial = this.direccion+"/historial/"+id_inventario+"/sucursal/"+id_sucursal;
     return this.http.get(direccionHistorial);
  }

  public desglose(cantidad,id_producto):Observable<any>{
    return   this.http.get(this.direccion1+"/calculoinsumo/"+cantidad+"/"+id_producto);
  }

   
}
