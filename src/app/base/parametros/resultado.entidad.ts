import { TipoMensaje } from "./tipo-mensaje.enum";
/**
 * Clase para manejar la entidad resultado.
 * 
 * @export
 * @class Resultado
 */
export class Resultado {
    public esValido: boolean;
    public mensaje: string;
    public tipoMensaje: TipoMensaje;
    public datoAdicional: any;
}