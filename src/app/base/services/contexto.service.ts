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

    // Lenguaje del sistema.
    private lenguaje:string = '';

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
                        // Obtiene le lenguaje inicial del sistema.
                        this.lenguaje = this.getConfig('lang');
                        resolve(true);
                    });
        });
    }  

    /**
     * Método para cambiar el lenguaje del sistema.
     * 
     * @param {string} pNuevoLenguaje Nuevo lenguaje.
     * @memberof ContextoService
     */
    setNuevoLenguaje(pNuevoLenguaje: string) {
        this.lenguaje = pNuevoLenguaje;
    }

    /**
     * Método para obtener el lenguaje actual del sistema.
     * 
     * @memberof ContextoService
     */
    getLenguajeActual() {
        return this.lenguaje ;
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

    finalizarContexto()
    {
        this.contextoUsuario = null;
    }
}
