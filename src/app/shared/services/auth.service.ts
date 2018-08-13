import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContextoService } from './contexto.service';
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
     * @memberof AuthService
     */
    constructor(
        private router: Router,
        private http: HttpClient,
        private contextoService: ContextoService
    ) {}

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

        this.http.post<Resultado>(`${this.contextoService.getConfig('backendApi')}/login`, params)
            .subscribe(
                response => {
                    if (response.data) {
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
            idHistoricoUsuarioSesion: this.contextoService.getItemContexto('IdHistoricoUsuarioSesion')
        };

        this.http.post<Resultado>(`${this.contextoService.getConfig('backendApi')}/logout`, params)
            .subscribe(
                response => {
                    // Finaliza el contexto.
                    this.contextoService.finalizarContexto();
                    // Redirecciona al login.
                    this.router.navigate(['/login']);
                }
            );
    }

    /**
    * Método para determinar si el usuario esta autenticado en base al token.
    */
    isUserAuthenticated(): boolean {
        return !this.isTokenExpired();
    }

    /**
     * Método para verificar si el token esta expirado o no.
     *
     * @param {string} [token=this.getToken()]
     * @param {number} [offsetSeconds]
     * @returns {boolean}
     * @memberof JwtService
     */
    isTokenExpired(token: string = this.getToken(), offsetSeconds?: number): boolean {

        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);

        offsetSeconds = offsetSeconds || 0;

        if (date === undefined) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }

    /**
     * Método para obtener el token.
     *
     * @returns {string}
     * @memberof JwtService
     */
    private getToken(): string {
        return this.contextoService.getItemContexto('token');
    }

    private urlBase64Decode(str: string): string {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
        case 0: {
            break;
        }
        case 2: {
            output += '==';
            break;
        }
        case 3: {
            output += '=';
            break;
        }
        default: {
            throw new Error('Illegal base64url string!');
        }
        }
        return this.b64DecodeUnicode(output);
    }

    // credits for decoder goes to https://github.com/atk
    private b64decode(str: string): string {
        const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';

        str = String(str).replace(/=+$/, '');

        if (str.length % 4 === 1) {
            throw new Error(
                '\'atob\' failed: The string to be decoded is not correctly encoded.'
            );
        }

        for (
        // initialize result and counters
        let bc = 0, bs: any, buffer: any, idx = 0;
        // get next character
        (buffer = str.charAt(idx++));
        // character found in table? initialize bit storage and add its ascii value;
        // tslint:disable-next-line:no-bitwise
        ~buffer &&
        (
            (bs = bc % 4 ? bs * 64 + buffer : buffer),
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4
        )
            // tslint:disable-next-line:no-bitwise
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0
        ) {
        // try to find character in table (0-63, not found => -1)
        buffer = chars.indexOf(buffer);
        }
        return output;
    }

    private b64DecodeUnicode(str: any): string {
        return decodeURIComponent(
        Array.prototype.map
            .call(this.b64decode(str), (c: any) => {
            // tslint:disable-next-line:prefer-template
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );
    }

    private decodeToken(token: string = this.getToken()): any {
        const parts = token.split('.');

        if (parts.length !== 3) {
            throw new Error('The inspected token doesn\'t appear to be a JWT. Check to make sure it has three parts.');
        }

        const decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token.');
        }

        return JSON.parse(decoded);
    }

    private getTokenExpirationDate(token: string = this.getToken()): Date {
        let decoded: any;
        decoded = this.decodeToken(token);

        if (!decoded.hasOwnProperty('exp')) {
            return undefined;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);

        return date;
    }
}
