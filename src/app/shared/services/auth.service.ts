import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { ContextoService } from './contexto.service';
import { LangService } from './lang.service';
import { Resultado } from '../../shared/models/resultado.model';

/**
 * Servicio de autenticación.
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

    /**
     * Url de retorno para cuando se redirecciona al login.
     *
     * @type {string}
     * @memberof AuthService
     */
    returnUrl: string;

    /**
     *Creates an instance of AuthService.
     * @param {Router} router
     * @param {HttpClient} http
     * @param {LangService} langService
     * @param {ContextoService} contextoService
     * @param {JwtService} jwtService
     * @memberof AuthService
     */
    constructor(
        private router: Router,
        private http: HttpClient,
        private contextoService: ContextoService,
        private jwtService: JwtService) {}

    /**
     * loginUser Permite realizar la autenticacion del usuario.
     * @param username nombre de usuario del sistema
     * @param password password del usuario para acceder al sistema
     */
    loginUser(pUsername: string, pPassword: string): void {
        const params = {
            user: pUsername,
            pass: pPassword
        };

        this.http.post<Resultado>(`${this.contextoService.getBackendAPI()}/login`, params)
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
                }
            );
    }

    /**
     * Funcion logoutUser
     * Permite realizar el cierre de sesion del usuario
     */
    logoutUser(): void {
        const params = {
            idHistoricoUsuarioSesion: this.contextoService.getIdSesion()
        };

        this.http.post<Resultado>(`${this.contextoService.getBackendAPI()}/logout`, params)
            .subscribe(
                response => {
                    // Remueve el token del local storage.
                    localStorage.removeItem('user_token');
                    // Finaliza el contexto.
                    this.contextoService.finalizarContexto();
                    // Redirecciona al login.
                    this.router.navigate(['/login']);
                }
            );
    }

    /**
    * Funcion isUserAuthenticated
    * Devuelve el token para saber si el usuario esta autentificado o no.
    */
    isUserAuthenticated(): boolean {
        return !this.jwtService.isTokenExpired();
    }
}
