import { Error } from "./error.model";
import { eTipoNotificacion } from "../enums/tipo-notificacion.enum";

/**
 * Modelo de resultado usado en el response de la API RESTful.
 * 
 * @export
 * @class Resultado
 */
export class Resultado {
    
    /**
     * Datos de la operación, puede ser de cualquier tipo.
     * 
     * @type {*}
     * @memberof Resultado
     */
    public data: any;
    
    /**
     * Mensaje asociado al resultado.
     * 
     * @type {string}
     * @memberof Resultado
     */
    public message: string;

    /**
     * Error de la operación.
     * 
     * @type {any}
     * @memberof Resultado
     */
    public error: any;

    /**
     * Tipo de notificación.
     * 
     * @type {eTipoNotificacion}
     * @memberof Resultado
     */
    public tipoNotificacion: eTipoNotificacion
}