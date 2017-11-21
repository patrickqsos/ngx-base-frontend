import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment'; //path to your environment files
import { BaseLang } from "../parametros/base.lang";

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

    // Contexto de usuario proveniente de la autenticación.
    public contextoUsuario = null;

    constructor(private http: HttpClient) {}

    /**
     * Método para obtener una variable del archivo de configuración.
     * 
     * @param {*} key Key de la variable en el archivo de configuración.
     * @returns Valor de la variable en el archivo de configuración.
     * @memberof ContextoService
     */
    public getConfig(key: any) {
        return this.config[key];
    }
  
    /**
     * Método para obtener 
     * 
     * @param {*} key 
     * @returns 
     * @memberof ContextoService
     */
    public getEnv(key: any) {
        return this.env[key];
    }

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
                        this.idiomaSeleccionado = this.idiomas[0];

                        resolve(true);
                    });
        });
    }  

    /**
     * Método para cambiar el idioma del sistema.
     * 
     * @param {string} pNuevoLenguaje Nuevo idioma.
     * @memberof ContextoService
     */
    setNuevoLenguaje(pNuevoLenguaje: string) {
        this.idiomaSeleccionado = pNuevoLenguaje;
    }

    /**
     * Método para obtener el idioma actual del sistema.
     * 
     * @memberof ContextoService
     */
    getLenguajeActual() {
        return this.idiomaSeleccionado ;
    }

    /**
     * Método para setear la lista de recursos disponibles
     * 
     * @param {any} pListaRecursos 
     * @memberof ContextoService
     */
    getListaModulos(){
        if(this.contextoUsuario != null && this.contextoUsuario.RecursosUsuario != null)
            return this.contextoUsuario.RecursosUsuario;
        else
            return [];
    }

    /**
     * Método para setear el contexto de usuario recibido desde la autenticación.
     * 
     * @param {*} pContextoUsuario Contexto de usuario.
     * @memberof ContextoService
     */
    setContexto(pContextoUsuario: any)
    {
        this.contextoUsuario = pContextoUsuario;
    }

    /**
     * Método para finalizar el contexto de la aplicación.
     * 
     * @memberof ContextoService
     */
    finalizarContexto()
    {
        this.contextoUsuario = null;
        // todo: finalizar contexto en comun.
    }

    /**
     * Método para obtener el usuario loggeado en el contexto.
     * 
     * @memberof ContextoService
     */
    getUsuario()
    {
        // Valida si el nombre del usuario esta en el contexto.
        if(this.contextoUsuario != null && this.contextoUsuario.NombreCompletoUsuario != null)
            return this.contextoUsuario.NombreCompletoUsuario;
        else
            return null;
    }

    /**
     * Método para obtener la institución del usuario loggeado en el contexto.
     * 
     * @memberof ContextoService
     */
    getInstitucion(){
        // Valida si el nombre de la institución esta en el contexto.
        if(this.contextoUsuario != null && this.contextoUsuario.NombreInstitucion != null)
            return this.contextoUsuario.NombreInstitucion;
        else
            return null;
    }

    esMultiplesIdioma()
    {
        return this.idiomas.length > 1;
    }

    getIdiomas()
    {
        return this.idiomas;
    }
}
