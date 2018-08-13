import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as SecureLS from 'secure-ls';

/**
 * Servicio para interactuar con el contexto del sistema.
 *
 * @export
 * @class ContextoService
 */
@Injectable()
export class ContextoService {

    // Array de idiomas disponibles.
    private idiomas = [];

    // Configuración leida del archivo de configuración.
    private config: Object = undefined;

    private ls: any;

    // Idioma seleccionado para el sistema.
    idiomaSeleccionado = '';

    // Array que contiene todos los menus seleccionado, sirve para armar las migas de pan.
    breadCrumbs: Array<any> = [];

    // Lista de items del menu.
    listaMenu: Array<any> = [];

    // Bandera que indica si el componente esta cargando algo, util para habilitar/deshabilitar botones
    isLoading = false;

    /**
     * Creates an instance of ContextoService.
     * @param {HttpClient} http Servicio HttpClient
     * @memberof ContextoService
     */
    constructor(private http: HttpClient) {
        this.ls = new SecureLS({
            encodingType: '',
            isCompression: false
        });
    }

    /**
     * Método para cargar el archivo de configuración.
     *
     * @returns Archivo de configuración.
     * @memberof ContextoService
     */
    load(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // Lee el archivo de configuración.
            this.http.get(`../../../configs/config.${environment.env}.json`)
                    .subscribe((responseData) => {
                        // Guarda localmente la configuración leida.
                        this.config = responseData;
                        // Obtiene idiomas  del sistema.
                        this.idiomas = this.getConfig('langs');
                        // Por defecto selcciona el primer idioma.
                        this.idiomaSeleccionado = this.idiomas[0]['id'];
                        // Carga menu inicial.
                        this.listaMenu = this.getListaSchemas();
                        // Resuelve promesa.
                        resolve(true);
                    });
        });
    }

     /**
     * Método para obtener una variable del archivo de configuración.
     *
     * @param {string} key Key de la variable en el archivo de configuración.
     * @returns Valor de la variable en el archivo de configuración.
     * @memberof ContextoService
     */
    getConfig(key: string): any {
        return this.config[key];
    }

    /**
     *  Método para obtener lista de recursos hijos.
     *
     * @returns {any[]} Lista de recursos hijos.
     * @memberof ContextoService
     */
    getListaSchemas(): Array<any> {
        const listaSchemas = [];
        const item = this.getItemContexto('RecursosUsuario');
        if (item) {
            for (const modulo of item) {
                // for(let schema of modulo.RecursosHijos) {
                    listaSchemas.push(modulo);
                // }
            }
        }
        return listaSchemas;
    }

    /**
     * Función que valida si la url esta dentro de los recursos del contexto comun.
     *
     * @param {string} pUrl Url a validar.
     * @returns {boolean} Bandera que indica si la validación pasó o no.
     * @memberof ContextoService
     */
    checkRecurso(pUrl: string): boolean {
        const item = this.getItemContexto('Recursos');
        if (item) {
            const result = item.filter(obj => {
                return pUrl.includes(obj.Uri);
                // return obj.Uri === pUrl.substring(1);
            });
            return result.length > 0;
        } else {
            return false;
        }
    }

    /**
     * Método para setear el contexto de usuario recibido desde la autenticación.
     *
     * @param {*} pContextoUsuario Contexto de usuario.
     * @memberof ContextoService
     */
    setContexto(pContextoUsuario: any): void {
        this.ls.set('context', pContextoUsuario);
    }

    /**
     * Método para finalizar el contexto de la aplicación.
     *
     * @memberof ContextoService
     */
    finalizarContexto(): void {
        localStorage.removeItem('context');
    }

    /**
     * Método para obtener un item del contexto.
     *
     * @param {string} key
     * @returns {*}
     * @memberof ContextoService
     */
    getItemContexto(key: string): any {
        const context = this.ls.get('context');
        if (context) {
            return context[key];
        } else {
            return undefined;
        }
    }
}
