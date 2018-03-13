import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Resultado } from '../../shared/models/resultado.model';
import { LangService } from '../../shared/services/lang.service';
import { BaseComponent } from '../../shared/base.component';

@Component({
    selector: 'shared-confirm-dialog',
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent extends BaseComponent implements OnInit {
    
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
        public langService: LangService,
    
    ) {
        super();
    }

    ngOnInit() { 
    }
}