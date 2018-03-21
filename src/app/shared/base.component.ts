
import { eModulo } from '../shared/enums/modulo.enum';
import { LangService } from '../shared/services/lang.service';
import { UtilService } from '../shared/services/util.service';
import { NotificacionService } from '../shared/services/notificacion.service';
import { Component } from '@angular/core';
import { eTipoNotificacion } from '../shared/enums/tipo-notificacion.enum';
import { Subject } from 'rxjs/Subject';

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
     * @public
     * @memberof BaseComponent
     */
    public eModulo = eModulo;

    /**
     * Enum que contiene los tipos de mensaje.
     *
     * @public
     * @memberof BaseComponent
     */
    public eTipoNotificacion = eTipoNotificacion;

    /**
     * Propiedad subject para manejar los unsubscribe de forma general en un componente.
     * 
     * @protected
     * @type {Subject<boolean>} Subject que emite valores booleanos.
     * @memberof BaseComponent
     */
    protected unsubscribe$: Subject<boolean> = new Subject();

    /**
     * Bandera que indica si el componente esta cargando algo, util para habilitar/deshabilitar botones
     * 
     * @protected
     * @type {boolean}
     * @memberof BaseComponent
     */
    protected isLoading: boolean = false;
}
