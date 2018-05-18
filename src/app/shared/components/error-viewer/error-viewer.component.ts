import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resultado } from '../../../shared/models/resultado.model';
import { LangService } from '../../../shared/services/lang.service';
import { BaseComponent } from '../../../shared/base.component';

@Component({
    selector: 'shared-error-viewer',
    templateUrl: './error-viewer.component.html'
})
export class ErrorViewerComponent extends BaseComponent {
    constructor(
        public dialogRef: MatDialogRef<ErrorViewerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Resultado,
        public langService: LangService
    ) {
        super();
    }

    onClose(): void {
        this.dialogRef.close();
    }
}
