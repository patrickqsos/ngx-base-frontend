import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resultado } from '../../../shared/models/resultado.model';
import { LangService } from '../../../shared/services/lang.service';
import { BaseComponent } from '../../../shared/base.component';

/**
 * Componente para mostrar errores.
 *
 * @export
 * @class ErrorViewerComponent
 * @extends {BaseComponent}
 */
@Component({
    selector: 'shared-error-viewer',
    templateUrl: './error-viewer.component.html'
})
export class ErrorViewerComponent extends BaseComponent {

    /**
     * Creates an instance of ErrorViewerComponent.
     * @param {MatDialogRef<ErrorViewerComponent>} dialogRef
     * @param {Resultado} data
     * @param {LangService} langService
     * @memberof ErrorViewerComponent
     */
    constructor(
        public dialogRef: MatDialogRef<ErrorViewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Resultado,
        public langService: LangService
    ) {
        super();
    }
}
