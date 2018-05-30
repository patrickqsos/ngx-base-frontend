import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { baseLang } from '../../base/base.lang';

/**
 * Servicio para interactuar con el contexto del sistema.
 *
 * @export
 * @class ContextoService
 */
@Injectable()
export class ContextoService {

    // Idioma seleccionado para el sistema.
    private idiomaSeleccionado = '';

    // Array de idiomas disponibles.
    private idiomas = [];

    // Configuración leida del archivo de configuración.
    private config: Object = undefined;

    // Entorno del sistema.
    private env: Object = undefined;

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
    constructor(private http: HttpClient) {}

    /**
     * Método para cargar el archivo de configuración.
     *
     * @returns Archivo de configuración.
     * @memberof ContextoService
     */
    load(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // Define entorno: desarrollo o producción.
            this.env = 'dev';
            if (environment.production) {
                this.env = 'prod';
            }
            // Lee el archivo de configuración.
            this.http.get(`../../../config/${this.env}.config.json`)
                    .subscribe((responseData) => {
                        // Guarda localmente la configuración leida.
                        this.config = responseData;
                        // Obtiene idiomas  del sistema.
                        this.idiomas = this.getConfig('langs');
                        // Por defecto selcciona el primer idioma.
                        this.idiomaSeleccionado = this.idiomas[0]['id'];
                        // Carga menu inicial.
                        this.listaMenu = this.getListaSchemas();

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

    getBackendAPI(): string {
        return this.config['backendApi'];
    }

    /**
     * Método para cambiar el idioma del sistema.
     *
     * @param {string} pNuevoLenguaje Nuevo idioma.
     * @memberof ContextoService
     */
    setNuevoIdioma(pNuevoIdioma: string): void {
        this.idiomaSeleccionado = pNuevoIdioma;
    }

    /**
     * Método para obtener el idioma actual del sistema.
     *
     * @memberof ContextoService
     */
    getIdiomaActual(): string {
        return this.idiomaSeleccionado ;
    }

    /**
     * Método para obtener lista de modulos del sistema.
     *
     * @returns {any[]} Lista de modulos.
     * @memberof ContextoService
     */
    getListaModulos(): Array<any> {
        if (this.getContexto() && this.getContexto().RecursosUsuario) {
            return this.getContexto().RecursosUsuario;
        } else {
            return [];
        }
    }

    /**
     *  Método para obtener lista de recursos hijos.
     *
     * @returns {any[]} Lista de recursos hijos.
     * @memberof ContextoService
     */
    getListaSchemas(): Array<any> {
        // Instancia lista.
        const listaSchemas = [];
        // Valida si existe elementos en la lista.
        if (this.getContexto() && this.getContexto().RecursosUsuario) {
            // Recorre lista de recursos hijos para adiconarlos a la lista a devolver.
            for (const modulo of this.getContexto().RecursosUsuario) {
                // for(let schema of modulo.RecursosHijos) {
                    listaSchemas.push(modulo);
                // }
            }
        }
        // Retorna lista.
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
        // Valida si el contexto tiene la propiedad de recursos.
        if (this.getContexto() && this.getContexto().Recursos) {
            const recursos = this.getContexto().Recursos;
            // Busca el recurso en el contexto.
            const result = recursos.filter(obj => {
                return pUrl.includes(obj.Uri);
                // return obj.Uri === pUrl.substring(1);
            });
            // Retorna bandera.
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
        // Guarda en el local storage el contexto.
        localStorage.setItem('context', JSON.stringify(pContextoUsuario));
    }

    /**
     * Método para obtener el contexto.
     *
     * @returns
     * @memberof ContextoService
     */
    getContexto(): any {
        // Obtiene desde el local storage el contexto.
        return JSON.parse(localStorage.getItem('context'));
    }

    /**
     * Método para finalizar el contexto de la aplicación.
     *
     * @memberof ContextoService
     */
    finalizarContexto(): void {
        // Remueve el contexto del local storage.
        localStorage.removeItem('context');
    }

    /**
     * Método para obtener el usuario loggeado en el contexto.
     *
     * @returns {string}
     * @memberof ContextoService
     */
    getUsuario(): string {
        // Valida si el nombre del usuario esta en el contexto.
        if (this.getContexto() && this.getContexto().NombreCompletoUsuario) {
            return this.getContexto().NombreCompletoUsuario;
        } else {
            return undefined;
        }
    }

    /**
     * Método para obtener la institución del usuario loggeado en el contexto.
     *
     * @returns {string}
     * @memberof ContextoService
     */
    getInstitucion(): string {
        // Valida si el nombre de la institución esta en el contexto.
        if (this.getContexto() && this.getContexto().NombreInstitucion) {
            return this.getContexto().NombreInstitucion;
        } else {
            return undefined;
        }
    }

    /**
     * Método para evaluar si el sistema tiene multiples idiomas.
     *
     * @returns {boolean}
     * @memberof ContextoService
     */
    esMultiIdioma(): boolean {
        return this.idiomas.length > 1;
    }

    /**
     * Método para obtener listado de idiomas.
     *
     * @returns {*}
     * @memberof ContextoService
     */
    getIdiomas(): Array<any> {
        return this.idiomas;
    }

    /**
     * Método para obtener el IdHistoricoUsuarioSesion desde el contexto.
     *
     * @returns {number} IdHistoricoUsuarioSesion.
     * @memberof ContextoService
     */
    getIdSesion(): number {
        // Valida si el nombre del usuario esta en el contexto.
        if (this.getContexto() && this.getContexto().IdHistoricoUsuarioSesion) {
            return this.getContexto().IdHistoricoUsuarioSesion;
        } else {
            return undefined;
        }
    }

}
