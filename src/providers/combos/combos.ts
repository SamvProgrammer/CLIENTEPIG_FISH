import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';

/*
  Generated class for the CombosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CombosProvider {

  private data:Observable<any>;
  private direccion = "";

  constructor(public http: HttpClient) {
    this.direccion = direcciones.combos;
  }


  public getCombos():Observable<any>{   
    this.data = this.http.get(this.direccion);
    return this.data;
   }

   public getCombosDetalle(id):Observable<any>{   
    let ruta = this.direccion+"/detalle/"+id;
    
    this.data = this.http.get(ruta);
    return this.data;
   }

   public eliminarCombos(id):Observable<any>{
    this.data = this.http.delete(this.direccion+"/"+id);
    return this.data;
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

}
