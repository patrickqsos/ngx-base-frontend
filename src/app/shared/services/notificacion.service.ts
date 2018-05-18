import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Resultado } from '../../shared/models/resultado.model';
import { NotificacionComponent } from '../../base/notificacion/notificacion.component';
import { eTipoNotificacion } from '../../shared/enums/tipo-notificacion.enum';
import { Subject ,  Observable ,  ReplaySubject } from 'rxjs';

/**
 * Servicio para notificar mensajes.
 *
 * @export
 * @class NotificacionService
 */
@Injectable()
export class NotificacionService {

  /**
   * Observable para notificar el avance del progressbar.
   *
   * @type {(Observable<number | null>)}
   * @memberof NotificacionService
   */
  progress$: Observable<number | null>;

  /**
   * Observable para recibir el avance del progressbar desde el backend interceptor.
   *
   * @type {(Subject<number | null>)}
   * @memberof NotificacionService
   */
  progressSubject: Subject<number | null>;

  /**
   * Creates an instance of NotificacionService.
   * @param {MatSnackBar} snackBar
   * @memberof NotificacionService
   */
  constructor(private snackBar: MatSnackBar) {
      this.progressSubject = new ReplaySubject<number | null>(1);
      this.progress$ = this.progressSubject.asObservable();
  }

  /**
   * Notifica una entidad resultado en un snackbar.
   *
   * @param {Resultado} pResultado Entidad resultado a notificar.
   * @param {number} [pTiempo=2000] Tiempo de duración de la notificación.
   * @memberof NotificacionService
   */
  showSnackbarResultado(pResultado: Resultado, pTiempo: number = 2000): void {
    this.snackBar.openFromComponent(NotificacionComponent, {
      data: pResultado,
      duration: pTiempo,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  /**
   * Notifica un mensaje en un snackbar.
   *
   * @param {string} pMensaje Mensaje a notificar.
   * @param {number} [pTiempo=2000] Tiempo de duración de la notificación.
   * @param {eTipoNotificacion} pTipoNotificacion Tipo de mensaje a notificar (segun el tipo, el color e icono cambia)
   * @memberof NotificacionService
   */
  showSnackbarMensaje(pMensaje: string, pTiempo: number = 2000, pTipoNotificacion: eTipoNotificacion = eTipoNotificacion.Correcto): void {

    // Arma objeto resultado.
    const resultado = new Resultado();
    resultado.message = pMensaje;
    resultado.tipoNotificacion = pTipoNotificacion;

    // Abre el snackbar.
    this.snackBar.openFromComponent(NotificacionComponent, {
      data: resultado,
      duration: pTiempo,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  /**
   * Notifica entidad resultado en un toast con boton para
   *
   * @param {Resultado} pResult
   * @param {eTipoNotificacion} [pTipoNotificacion=eTipoNotificacion.Correcto]
   * @memberof NotificacionService
   */
  showSnackbarConBoton(pResult: Resultado, pTipoNotificacion: eTipoNotificacion = eTipoNotificacion.Correcto): void {

    // Arma objeto resultado.
    pResult.tipoNotificacion = pTipoNotificacion;

    // Abre el snackbar.
    this.snackBar.openFromComponent(NotificacionComponent, {
      data: pResult,
      horizontalPosition: 'left',
      verticalPosition: 'bottom'
    });
  }
}
