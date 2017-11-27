import { eModulo } from "../shared/enums/modulo.enum";
import { LangService } from "../shared/services/lang.service";
import { UtilService } from "../shared/services/util.service";
import { NotificacionService } from "../shared/services/notificacion.service";
import { Component } from "@angular/core";
import { eTipoMensaje } from "../shared/enums/tipo-mensaje.enum";

/**
 * Clase que sirve de base para los componentes creados.
 * 
 * @export
 * @class BaseComponent
 */
export class BaseComponent {

    /**
     * Enum que contiene lista de modulos.
     * 
     * @protected
     * @memberof BaseComponent
     */
    protected eModulo = eModulo

    /**
     * Enum que contiene los tipos de mensaje.
     * 
     * @protected
     * @memberof BaseComponent
     */
    protected eTipoMensaje = eTipoMensaje;
}