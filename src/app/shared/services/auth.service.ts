
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { ContextoService } from './contexto.service';
import { LangService } from './lang.service';
import { Resultado } from '../../shared/models/resultado.model';
import { NotificacionService } from './notificacion.service';
import { eModulo } from '../../shared/enums/modulo.enum';
import 'rxjs/add/operator/first';

@Injectable()
/**
 * Class AuthService
 * Clase que permite Realizar la autenticacion de usuarios.
 */
export class AuthService {
  token: string;
  // todo: sacar esto a config.json
  urlBase= 'http://localhost/pruebasRestful';

  /**
   * Constructor de la clase
   * @param router ;
   * @param http ;
   * @param langService ;
   * @param contextoService ;
   * @param snackBar ;
   */
  constructor(
    private router: Router,
    private http: HttpClient,
    private langService: LangService,
    private contextoService: ContextoService,
    private notificacionService: NotificacionService ) {}


    /**
     * loginUser Permite realizar la autenticacion del usuario.
     * @param username nombre de usuario del sistema
     * @param password password del usuario para acceder al sistema
     */
  loginUser(pUsername: string, pPassword: string) {

  //   this.http.post(this.urlBase + '/login.php', null).subscribe((response) => {
  //     return response;
  // });

    this.http.post<Resultado>(this.urlBase + '/login.php', {user: pUsername, pass: pPassword}, {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
    }).first().subscribe(
      (response) => {
        // Llama al servicio de notificacion.
        this.notificacionService.showSnackbarResultado(response);
        if (response.esValido) {
          this.token = 'token';
          this.contextoService.setContexto(response.datosAdicionales);
          this.router.navigate(['menu']);
          console.log('Progress Interceptor Intercept');
        }
    }
  );
  }

  /**
   * Funcion logoutUser
   * Permite realizar el cierre de sesion del usuario
   */
  logoutUser() {
    this.token = null;
    this.http.post(this.urlBase + '/logout.php', null).subscribe((response) => {
      // Llama al servicio de notificacion.
      this.notificacionService.showSnackbarMensaje(this.langService.getLang(eModulo.Base, 'loginCerrado'));
      this.contextoService.finalizarContexto();
      this.router.navigate(['/login']);
        return response;
    });

  }

  /**
   * Funcion getUserToken
   * Permite recuperar un token para accedr al sistema
   */
  getUserToken() {
    this.http.post(this.urlBase + '/token', null).subscribe((response: string) => {
        console.log('response');
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
