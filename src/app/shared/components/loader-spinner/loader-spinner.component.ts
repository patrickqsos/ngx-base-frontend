import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ContextoService } from '../../services/contexto.service';

@Component({
    selector: 'shared-loader-spinner',
    templateUrl: './loader-spinner.component.html'
})
export class LoaderSpinnerComponent extends BaseComponent {
    constructor(public contextService: ContextoService) {
        super();
    }
}
