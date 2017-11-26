import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';
import { Resultado } from '../../general/models/resultado.model';
import { eTipoMensaje } from '../../general/enums/tipo-mensaje.enum';
import { BaseComponent } from '../base.component';
/**
 * Componente para mostrar notificaciones.
 * 
 * @export
 * @class NotificacionComponent
 */
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent extends BaseComponent {

  /**
   * Creates an instance of NotificacionComponent.
   * @param {Resultado} contenido 
   * @memberof NotificacionComponent
   */
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public contenido: Resultado
  ) { super() }
}
