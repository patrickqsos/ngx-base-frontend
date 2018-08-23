import { eModulo } from '../shared/enums/modulo.enum';
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
     * Id seleccionado en un row.
     *
     * @type {*}
     * @memberof BaseComponent
     */
    idSeleccionado: any;

    /**
     * Contenido para mostrar un error en un dialog.
     *
     * @type {string}
     * @memberof BaseComponent
     */
    dialogError: string;

    /**
     * Propiedad subject para manejar los unsubscribe de forma general en un componente.
     *
     * @protected
     * @type {Subject<boolean>} Subject que emite valores booleanos.
     * @memberof BaseComponent
     */
    protected unsubscribe$: Subject<boolean> = new Subject();

    /**
     * Método para setear un id seleccionado.
     *
     * @param {*} id
     * @memberof BaseComponent
     */
    setIdSeleccionado(id: any): void {
        this.idSeleccionado = id;
    }

    /**
     * Método para quitar un id seleccionado.
     *
     * @memberof BaseComponent
     */
    unsetIdSeleccionado(): void {
        this.idSeleccionado = undefined;
    }
}
