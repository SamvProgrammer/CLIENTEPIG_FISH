import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { direcciones } from '../../assets/direcciones';
import { Observable } from 'rxjs/observable';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { CategoriasProvider } from '../../providers/categorias/categorias';

/*
  Generated class for the UsuariosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuariosProvider {
  private direccion = "";
  private data:Observable<any>;
  private obj;

  constructor(public http: HttpClient,private productosPrd:ProductosProvider,
    private cargandoCtrl:LoadingController,private categoriasPrd:CategoriasProvider,
    private storage:Storage) {
    this.direccion = direcciones.usuarios;
  }
  

  public getUsuarios():Observable<any>{    

 
   this.data = this.http.get(this.direccion);
   return this.data;
  }

  public eliminarUsuario(id):Observable<any>{
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
    console.log (obj);
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

  public getUsuarioEspecifico(usuario):Observable<any>{    
 
    console.log(usuario);
    this.data = this.http.get(this.direccion+"/buscarusuario/"+usuario);
    return this.data;
   }
  
   public ingresarSistema(obj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let url = this.direccion + "/login";
    let json = JSON.stringify(obj);
    return this.http.post(url, json, httpOptions);
  }

  public guardarUsuario(obj,cargarCatalogos) {
    this.obj = obj;
    console.log(obj);
    if(cargarCatalogos == true){

      let cargando = this.cargandoCtrl.create({content:"Cargando catalogo de productos"});
      cargando.present();
      this.productosPrd.getCategoriaConListaproductos().subscribe(listadoproductos => {
        this.categoriasPrd.gets().subscribe(categorias=>{
           let objetoGuardar = {
             categorias:categorias,
             listaproductos:listadoproductos
           };
  
           this.storage.set("listaproductosdetallemesa",objetoGuardar);
           cargando.dismiss();
        });
      });
    }
  }

  public getUsuario() {
    return this.obj;
  }

  public getSucursal(){
    return this.obj.id_carrito;
  }

  public getIdUsuario(){
    return this.obj.id;
  }

  public activarMenu(): boolean {
    return this.obj.menu;
  }
  public activarCatalogos(): boolean {
    return this.obj.catalogos;
  }
  public activarBar(): boolean {
    return this.obj.bar;
  }
  public activarCocina(): boolean {
    return this.obj.cocina;
  }
  public activarTransacciones(): boolean {
    return this.obj.transacciones;
  }

  public activarCuentas():boolean{
    return this.obj.cuentas;
  }

  public getNombreUsuario(){
    return this.obj.nombre;
  }

  public inicio():boolean{
    return this.obj.inicio;
  }
  public usuarios():boolean{
    return this.obj.usuarios;
  }

  public sucursales():boolean{
    return this.obj.sucursales;
  }

  public productos():boolean{
    return this.obj.productos;
  }
  public caja():boolean{
    return this.obj.caja;
  }
  public historial_cuentas():boolean{
    return this.obj.historial_cuentas;
  }

  public inventario():boolean{
    return this.obj.inventario;
  }

  public pedidos():boolean{
    return this.obj.pedidos;
  }

  public configuraciones():boolean{
    return this.obj.configuraciones;
  }

  public promociones():boolean{
    return this.obj.promociones;
  }

  public iniciar_en(){
    return this.obj.iniciar_en;
  }

 
}
