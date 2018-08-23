import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LangService } from '../../../shared/services/lang.service';
import { BaseComponent } from '../../../shared/base.component';

/**
 * Componente para mostrar dialog de confirmación de acciones.
 *
 * @export
 * @class ConfirmDialogComponent
 * @extends {BaseComponent}
 */
@Component({
    selector: 'shared-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent extends BaseComponent {

    /**
     * Creates an instance of ConfirmDialogComponent.
     * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
     * @param {*} data Data para el dialog.
     * @param {LangService} langService Servicio lang.
     * @memberof ConfirmDialogComponent
     */
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public langService: LangService

    ) {
        super();
    }
}
