import { Component, Input } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { MatTableDataSource } from '@angular/material';
import { LangService } from '../../services/lang.service';

@Component({
    selector: 'shared-table-empty',
    templateUrl: './table-empty.component.html'
})
export class TableEmptyComponent extends BaseComponent {

    @Input() datasource: MatTableDataSource<any>;

    constructor(public langService: LangService) {
        super();
    }
}
