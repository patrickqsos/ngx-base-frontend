import { eModulo } from '../shared/enums/modulo.enum';
import { LangService } from '../shared/services/lang.service';
import { UtilService } from '../shared/services/util.service';
import { NotificacionService } from '../shared/services/notificacion.service';
import { Component } from '@angular/core';
import { eTipoNotificacion } from '../shared/enums/tipo-notificacion.enum';
import { Subject } from 'rxjs';
import { baseConfig } from '../base/base.config';
import { environment } from '../../environments/environment';

/**
 * Clase que sirve de base para los componentes creados.
 *
 * @export
 * @class BaseComponent
 */
export class BaseComponent {

    /**
     * Objeto que contiene la configuración base.
     *
     * @memberof BaseComponent
     */
    config = baseConfig;

    /**
     * Objeto que contiene el environment de ejecución.
     *
     * @memberof BaseComponent
     */
    environment = environment;

    /**
     * Enum que contiene lista de modulos.
     *
     * @public
     * @memberof BaseComponent
     */
    eModulo = eModulo;

    /**
     * Enum que contiene los tipos de mensaje.
     *
     * @public
     * @memberof BaseComponent
     */
    eTipoNotificacion = eTipoNotificacion;

    /**
     * Propiedad subject para manejar los unsubscribe de forma general en un componente.
     *
     * @protected
     * @type {Subject<boolean>} Subject que emite valores booleanos.
     * @memberof BaseComponent
     */
    protected unsubscribe$: Subject<boolean> = new Subject();
}
