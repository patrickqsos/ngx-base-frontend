import { Component, OnInit, Inject } from '@angular/core';
import { BaseComponent } from '../../../../shared/base.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { Todos } from '../../../models/todos.model';
import { eTipoFlujo } from '../../../enums/grid.enums';
import { LangService } from '../../../../shared/services/lang.service';

@Component({
    selector: 'demo-grid-modal',
    templateUrl: './grid-modal.component.html'
})
export class GridModalComponent extends BaseComponent implements OnInit {

    form: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<GridModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formbuilder: FormBuilder,
        public contextService: ContextoService,
        public langService: LangService

    ) {
        super();
    }

    ngOnInit(): void {
        const dataForm: Todos = new Todos();

        if (this.data.tipoFlujo === eTipoFlujo.Update) {
            dataForm.id = this.data.objeto.id;
            dataForm.userId = this.data.objeto.userId;
            dataForm.title = this.data.objeto.title;
        }

        this.form = this.formbuilder.group({
            id: [dataForm.id, [Validators.required, Validators.maxLength(3)]],
            userId: [dataForm.userId, [Validators.required]],
            title: [dataForm.title, [Validators.required, Validators.maxLength(1)]]
        });
    }
}
