import { eTipoMensaje } from "../enums/tipo-mensaje.enum";
/**
 * Clase para manejar la entidad resultado.
 * 
 * @export
 * @class Resultado
 */
export class Resultado {
    
    /**
     * Bandera que determina si el resultado es válido o no. 
     * 
     * @type {boolean}
     * @memberof Resultado
     */
    public esValido: boolean;
    
    /**
     * Mensaje asociado al resultado.
     * 
     * @type {string}
     * @memberof Resultado
     */
    public mensaje: string;

    /**
     * Tipo de mensaje.
     * 
     * @type {eTipoMensaje}
     * @memberof Resultado
     */
    public tipoMensaje: eTipoMensaje;

    /**
     * Dato adicional del resultado, puede ser de cualquier tipo.
     * 
     * @type {*}
     * @memberof Resultado
     */
    public datoAdicional: any;
}