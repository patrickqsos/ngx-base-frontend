import { Component, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatDialog, MatSnackBarRef} from '@angular/material';
import { Resultado } from '../../shared/models/resultado.model';
import { eTipoNotificacion } from '../../shared/enums/tipo-notificacion.enum';
import { BaseComponent } from '../../shared/base.component';
import { ErrorViewerComponent } from '../../shared/error-viewer/error-viewer.component';
import { LangService } from '../../shared/services/lang.service';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Componente para mostrar notificaciones.
 * 
 * @export
 * @class NotificacionComponent
 */
@Component({
  selector: 'base-notificacion',
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
    public snackBarRef: MatSnackBarRef<NotificacionComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public contenido: Resultado,
    public langService: LangService,
    private dialog: MatDialog,
    public sanitizer: DomSanitizer,
  ) { super() }

  /**
   * Abre el contenido del error en un dialog.
   * 
   * @memberof NotificacionComponent
   */
  openError() : void {
    let dialogRef = this.dialog.open(ErrorViewerComponent, {
      width: '600px',
      data: this.contenido 
		});

    dialogRef.afterClosed().subscribe(result => {
      this.snackBarRef.dismiss();
    });
  }
}
