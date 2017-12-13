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
     * Dato del resultado, puede ser de cualquier tipo.
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
     * Array de errores.
     * 
     * @type {Error[]}
     * @memberof Resultado
     */
    public error: Error[];

    /**
     * Tipo de notificación.
     * 
     * @type {eTipoNotificacion}
     * @memberof Resultado
     */
    public tipoNotificacion: eTipoNotificacion
}