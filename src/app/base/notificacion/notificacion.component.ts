import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatDialog, MatSnackBarRef } from '@angular/material';
import { Resultado } from '../../shared/models/resultado.model';
import { BaseComponent } from '../../shared/base.component';
import { ErrorViewerComponent } from '../../shared/components/error-viewer/error-viewer.component';
import { LangService } from '../../shared/services/lang.service';

/**
 * Componente para mostrar notificaciones.
 *
 * @export
 * @class NotificacionComponent
 */
@Component({
  selector: 'base-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css'],
  host: { class: 'mat-simple-snackbar' }
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
        private dialog: MatDialog
    ) {
        super();
    }

    /**
     * Abre el contenido del error en un dialog.
     *
     * @memberof NotificacionComponent
     */
    openError(): void {
        const dialogRef = this.dialog.open(ErrorViewerComponent, {
            width: '600px',
            data: this.contenido
        });

        dialogRef.afterClosed().subscribe(result => {
            this.snackBarRef.dismiss();
        });
    }
}
