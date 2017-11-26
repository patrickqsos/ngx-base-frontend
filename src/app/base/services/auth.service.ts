import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material'
import { ContextoService } from './contexto.service';
import { LangService } from './lang.service';
import { Resultado } from '../../general/models/resultado.model';
import { NotificacionService } from './notificacion.service';
import { eModulo } from '../../general/enums/modulo.enum';

@Injectable()
/**
 * Class AuthService
 * Clase que permite Realizar la autenticacion de usuarios.
 */
export class AuthService {
  token: string;
  // todo: sacar esto a config.json
  urlBase: string = "http://localhost/pruebasRestful";

  /**
   * Constructor de la clase
   * @param router 
   * @param http 
   * @param langService 
   * @param contextoService 
   * @param snackBar 
   */
  constructor(
    private router: Router,
    private http:HttpClient,
    private langService : LangService,
    private contextoService: ContextoService,
    private notificacionService: NotificacionService) {}


    /**
     * loginUser Permite realizar la autenticacion del usuario.
     * @param username nombre de usuario del sistema
     * @param password password del usuario para acceder al sistema
     */
  loginUser(username: string, password: string) {
    this.http.get<Resultado>(this.urlBase+"/login.php").subscribe(
      data=>{

        // Llama al servicio de notificacion.
        this.notificacionService.showSnackbarResultado(data);
        
        if(data.esValido)
        {
          this.token = "token";
          this.contextoService.setContexto(data.datoAdicional);
          this.router.navigate(['menu']);
        }
    })
  }

  /**
   * Funcion logoutUser
   * Permite realizar el cierre de sesion del usuario
   */
  logoutUser() {
    this.token = null;
    console.log("logout");
    this.http.post(this.urlBase+"/logout.php",null).subscribe((response)=>{
        return response;
    });

    // Llama al servicio de notificacion.
    this.notificacionService.showSnackbarMensaje(this.langService.getLang(eModulo.Base, 'loginCerrado'));

    this.contextoService.finalizarContexto();
    this.router.navigate(['/login'])
  }

  /**
   * Funcion getUserToken
   * Permite recuperar un token para accedr al sistema
   */
  getUserToken() {
    this.http.post(this.urlBase+"/token",null).subscribe((response:string)=>{
        console.log("response");
        this.token = response;
    });
    return this.token;
  }

  /**
   * Funcion isUserAuthenticated
   * Devuelve el token para saber si el usuario esta autentificado o no.
   */
  isUserAuthenticated() {
    return this.token != null;
  }
}
