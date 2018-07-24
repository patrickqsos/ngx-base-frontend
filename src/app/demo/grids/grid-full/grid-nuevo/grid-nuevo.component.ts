import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/base.component';
import { fadeInAnim } from '../../../../shared/animations/template.animation';
import { LangService } from '../../../../shared/services/lang.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Todos } from '../../../models/todos.model';
import { ContextoService } from '../../../../shared/services/contexto.service';
import { Router } from '@angular/router';
import { DemoService } from '../../../services/demo.service';

@Component({
    selector: 'demo-grid-nuevo',
    templateUrl: './grid-nuevo.component.html',
    animations: [fadeInAnim],
    host: {class: 'container-fluid', '[@fadeInAnim]': 'true'}
})
export class GridNuevoComponent extends BaseComponent implements OnInit {
    form: FormGroup;

    constructor(
        public langService: LangService,
        private formbuilder: FormBuilder,
        public contextService: ContextoService,
        public demoService: DemoService,
        private router: Router

    ) {
        super();
    }

    ngOnInit(): void {
        if (!this.demoService.todoSelected) {
            this.router.navigate(['demo/grid-full']);
        } else {
            const dataForm: Todos = this.demoService.todoSelected;

            this.form = this.formbuilder.group({
                id: [dataForm.id, [Validators.required, Validators.maxLength(3)]],
                userId: [dataForm.userId, [Validators.required]],
                title: [dataForm.title, [Validators.required, Validators.maxLength(100)]]
            });
        }
    }
}
