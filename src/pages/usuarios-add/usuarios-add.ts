import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import { RolesProvider } from '../../providers/roles/roles';
import { CarritoProvider } from '../../providers/carrito/carrito';


@Component({
  selector: 'page-usuarios-add',
  templateUrl: 'usuarios-add.html',
})
export class UsuariosAddPage {
  myForm: FormGroup;
  public boton: string = "";
  public arregloRoles: any = [];
  public arregloCarrito: any = [];
  private variable;
  public objMenu: any = {
    menu: [],
    activoEn: 0
  };

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private usuariosPrd: UsuariosProvider,
    private alertCtrl: AlertController,
    private parametros: NavParams,
    private rolesPrd: RolesProvider,
    private sucursalesPrd: CarritoProvider,
    private toasCtrl:ToastController
  ) {
    this.variable = this.parametros.get("parametro");

    this.boton = this.parametros.get("boton");
    if (this.variable == undefined) {
      const obj = { usuario: "", nombre: "", password1: "",password2:"", roles:"",sucursales:"",menu:false,inicio:false,barra:false,cocina:false,transacciones:false}
      this.myForm = this.createMyForm(obj);
    } else {
      this.objMenu.activoEn = this.variable.iniciar_en;
      let arreglo = ["inicio", "gestion_usuarios", "sucursales", "mesas", "caja", "productos", "historial_cuentas", "reportes", "autorizar", "inventario", "configuraciones"];
      for (let llave in this.variable) {
        for (let item of arreglo) {
          if (llave == item) {
            if (this.variable[llave] == true) {
              let activo = this.variable[llave]
              let nombre: string = llave;

              let submenu = { nombre: nombre.replace("_", " "), activo: activo, visualizar: true }
              this.objMenu.menu.push(submenu);
            }
          }
        }
      }

      this.myForm = this.createMyForm(this.variable);
    }
    
      this.arregloRoles = this.rolesPrd.getRoles();
    this.sucursalesPrd.getCarritos().subscribe(datos => {
      this.arregloCarrito = datos;
    });
  }

  private createMyForm(obj) {
    return this.formBuilder.group({
      usuario: [obj.login, Validators.required],
      nombre: [obj.nombre, Validators.required],
      password1: [obj.password, Validators.required],
      password2: [obj.password, Validators.required],
      roles: [obj.id_rol, Validators.required],
      sucursales: [obj.id_carrito, Validators.required],
      menu: obj.menu,
      inicio: obj.catalogos,
      cuentas:obj.cuentas,
      barra: obj.bar,
      cocina: obj.cocina,
      transacciones: obj.transacciones
    });
  }
  saveData() {
    let obj = this.myForm.value;
    let login = obj.usuario;
    let nombre = obj.nombre;
    let password = obj.password1;
    let id_rol = obj.roles;
    let id_sucursal = obj.sucursales;
    let menu = obj.menu;
    let catalogos = obj.inicio;
    let cuentas = obj.cuentas;
    let bar = obj.barra;
    let cocina = obj.cocina;
    let transacciones = obj.transacciones;



    obj = {
      login: login,
      nombre: nombre,
      idRol: id_rol,
      idCarrito:id_sucursal,
      password:password,
      menu:menu,
      catalogos:catalogos,
      bar:bar,
      cocina:cocina,
      cuentas:cuentas,
      transacciones:transacciones
    }
    
    if (this.boton == "Actualizar") {
      obj.idUser = this.variable.id_user;      
        this.usuariosPrd.modificar(obj).subscribe(datos => {
        let toas = this.toasCtrl.create({message:"Registro actualizado correctamente",duration:1500});
        toas.present();
        });
    } else {
       this.usuariosPrd.insertar(obj).subscribe(datos => {
         let toas = this.toasCtrl.create({message:"Registro insertado correctamente",duration:1500});
         toas.present();
       });
    }

    this.navCtrl.pop();
  }
}
