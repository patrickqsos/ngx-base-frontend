import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { JwtService } from './jwt.service';
import { ContextoService } from './contexto.service';
import { LangService } from './lang.service';
import { Resultado } from '../../shared/models/resultado.model';
import { NotificacionService } from './notificacion.service';
import { eModulo } from '../../shared/enums/modulo.enum';


@Injectable()
/**
 * Class AuthService
 * Clase que permite Realizar la autenticacion de usuarios.
 */
export class AuthService {

  /**
   * Url de retorno para cuando se redirecciona al login.
   *
   * @type {string}
   * @memberof AuthService
   */
  public returnUrl: string;

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
    private jwtService: JwtService) {}

  /**
   * loginUser Permite realizar la autenticacion del usuario.
   * @param username nombre de usuario del sistema
   * @param password password del usuario para acceder al sistema
   */
  loginUser(pUsername: string, pPassword: string) {
    this.http.post<Resultado>(this.contextoService.getBackendAPI() + '/login', {user: pUsername, pass: pPassword})
        .subscribe(
            response => {
                if (response.data) {
                    // Setea el token.
                    localStorage.setItem('user_token', response.data.token);
                    // Setea el contexto.
                    this.contextoService.setContexto(response.data);
                    // Si existe una url de retorno, se redirecciona ahi.
                    if (this.returnUrl) {
                    this.router.navigate([this.returnUrl]);
                    } else {
                    this.router.navigate(['menu']);
                    }
                }
            },
            error => {
            }
        );
  }

  /**
   * Funcion logoutUser
   * Permite realizar el cierre de sesion del usuario
   */
  logoutUser() {
    this.contextoService.isLoading = true;

    this.http.post<Resultado>(this.contextoService.getBackendAPI() + '/logout', { idHistoricoUsuarioSesion: this.contextoService.getIdSesion() } )
        .subscribe(
            response => {
                // Remueve el token del local storage.
                localStorage.removeItem('user_token');
                // Finaliza el contexto.
                this.contextoService.finalizarContexto();
                // Cambia estado de badnera loading.
                this.contextoService.isLoading = false;

                // Redirecciona al login.
                this.router.navigate(['/login']);
            },
            error => {
                // Cambia estado de badnera loading.
                this.contextoService.isLoading = false;
            }
        );
  }

  /**
   * Funcion isUserAuthenticated
   * Devuelve el token para saber si el usuario esta autentificado o no.
   */
  isUserAuthenticated() {
      return !this.jwtService.isTokenExpired();
  }
}
