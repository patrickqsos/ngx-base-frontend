import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { BaseLang } from "../../base/base.lang";

/**
 * Servicio para interactuar con el contexto del sistema. 
 * 
 * @export
 * @class ContextoService
 */
@Injectable()
export class ContextoService {

    // Idioma seleccionado para el sistema.
    private idiomaSeleccionado:string = '';

    // Array de idiomas disponibles.
    private idiomas = [];
    
    // Configuración leida del archivo de configuración.
    private config:Object = null;

    // Entorno del sistema.
    private env:Object = null;

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
    public load() {
        return new Promise((resolve, reject) => {
            // Define entorno: desarrollo o producción. 
            this.env = 'dev';
            if (environment.production)
                this.env = 'prod';
            // Lee el archivo de configuración.
            this.http.get('../../../assets/config/' + this.env + '.config.json')
                    .subscribe((responseData) => {
                        // Guarda localmente la configuración leida.
                        this.config = responseData;
                        // Obtiene idiomas  del sistema.
                        this.idiomas = this.getConfig('langs');
                        // Por defecto selcciona el primer idioma.
                        this.idiomaSeleccionado = this.idiomas[0]['id'];

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
    public getConfig(key: string):any {
        return this.config[key];
    }

    public getBackendAPI(): string {
        return this.config['backendApi'];
    }

    /**
     * Método para cambiar el idioma del sistema.
     * 
     * @param {string} pNuevoLenguaje Nuevo idioma.
     * @memberof ContextoService
     */
    setNuevoIdioma(pNuevoIdioma: string):void {
        this.idiomaSeleccionado = pNuevoIdioma;
    }

    /**
     * Método para obtener el idioma actual del sistema.
     * 
     * @memberof ContextoService
     */
    getIdiomaActual() {
        return this.idiomaSeleccionado ;
    }

    /**
     * Método para obtener lista de modulos del sistema.
     * 
     * @returns {any[]} Lista de modulos.
     * @memberof ContextoService
     */
    getListaModulos(): any[] {
        if(this.getContexto() != null && this.getContexto().RecursosUsuario != null)
            return this.getContexto().RecursosUsuario;
        else
            return [];
    }

    /**
     *  Método para obtener lista de recursos hijos.
     * 
     * @returns {any[]} Lista de recursos hijos.
     * @memberof ContextoService
     */
    getListaSchemas(): any[] {
        // Instancia lista.
        let listaSchemas = [];
        // Valida si existe elementos en la lista.
        if(this.getContexto()  != null && this.getContexto().RecursosUsuario != null){
            // Recorre lista de recursos hijos para adiconarlos a la lista a devolver.
            for(let modulo of this.getContexto().RecursosUsuario){
                for(let schema of modulo.RecursosHijos) {
                    listaSchemas.push(schema);
                }
            }
        }
        // Retorna lista.
        return listaSchemas;
    }

    /**
     * Método para setear el contexto de usuario recibido desde la autenticación.
     * 
     * @param {*} pContextoUsuario Contexto de usuario.
     * @memberof ContextoService
     */
    setContexto(pContextoUsuario: any):void {
        // Guarda en el local storage el contexto.
        localStorage.setItem('context', JSON.stringify(pContextoUsuario));
    }

    /**
     * Método para obtener el contexto.
     * 
     * @returns 
     * @memberof ContextoService
     */
    getContexto() {
        // Obtiene desde el local storage el contexto.
        return JSON.parse(localStorage.getItem('context'));
    }

    /**
     * Método para finalizar el contexto de la aplicación.
     * 
     * @memberof ContextoService
     */
    finalizarContexto():void {
        // Remueve el contexto del local storage.
        localStorage.removeItem('context');
    }

    /**
     * Método para obtener el usuario loggeado en el contexto.
     * 
     * @returns {string} 
     * @memberof ContextoService
     */
    getUsuario():string {
        // Valida si el nombre del usuario esta en el contexto.
        if(this.getContexto() != null && this.getContexto().NombreCompletoUsuario != null)
            return this.getContexto().NombreCompletoUsuario;
        else
            return null;
    }

    /**
     * Método para obtener la institución del usuario loggeado en el contexto.
     * 
     * @returns {string} 
     * @memberof ContextoService
     */
    getInstitucion():string {
        // Valida si el nombre de la institución esta en el contexto.
        if(this.getContexto() != null && this.getContexto().NombreInstitucion != null)
            return this.getContexto().NombreInstitucion;
        else
            return null;
    }

    /**
     * Método para evaluar si el sistema tiene multiples idiomas. 
     * 
     * @returns {boolean} 
     * @memberof ContextoService
     */
    esMultiIdioma():boolean {
        return this.idiomas.length > 1;
    }

    /**
     * Método para obtener listado de idiomas.
     * 
     * @returns {*} 
     * @memberof ContextoService
     */
    getIdiomas():any[] {
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
        if(this.getContexto() != null && this.getContexto().IdHistoricoUsuarioSesion != null)
            return this.getContexto().IdHistoricoUsuarioSesion;
        else
            return null;
    }
    
}
