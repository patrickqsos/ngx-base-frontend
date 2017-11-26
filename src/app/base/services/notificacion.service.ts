import { Injectable } from '@angular/core';
import { Resultado } from '../../general/models/resultado.model';
import { MatSnackBar } from '@angular/material';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { eTipoMensaje } from '../../general/enums/tipo-mensaje.enum';

/**
 * Servicio para notificar mensajes.
 * 
 * @export
 * @class NotificacionService
 */
@Injectable()
export class NotificacionService {
  /**
   * Creates an instance of NotificacionService.
   * @param {MatSnackBar} snackBar 
   * @memberof NotificacionService
   */
  constructor(private snackBar: MatSnackBar) { }

  /**
   * Notifica una entidad resultado en un snackbar.
   * 
   * @param {Resultado} pResultado Entidad resultado a notificar.
   * @param {number} [pTiempo=2000] Tiempo de duración de la notificación.
   * @memberof NotificacionService
   */
  showSnackbarResultado(pResultado: Resultado, pTiempo: number = 2000):void {
    this.snackBar.openFromComponent(NotificacionComponent, {
      data: pResultado,
      duration: pTiempo,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }

  /**
   * Notifica un mensaje en un snackbar.
   * 
   * @param {string} pMensaje Mensaje a notificar.
   * @param {number} [pTiempo=2000] Tiempo de duración de la notificación.
   * @param {eTipoMensaje} [pTipoMensaje=eTipoMensaje.Correcto] Tipo de mensaje a notificar (segun el tipo, el color e icono cambia)
   * @memberof NotificacionService
   */
  showSnackbarMensaje(pMensaje: string, pTiempo: number = 2000, pTipoMensaje: eTipoMensaje = eTipoMensaje.Correcto):void {

    // Arma objeto resultado.
    let resultado = new Resultado();
    resultado.mensaje = pMensaje;
    resultado.tipoMensaje = pTipoMensaje;

    // Abre el snackbar.
    this.snackBar.openFromComponent(NotificacionComponent, {
      data: resultado,
      duration: pTiempo,
      horizontalPosition: "right",
      verticalPosition: "bottom"
    });
  }
}
