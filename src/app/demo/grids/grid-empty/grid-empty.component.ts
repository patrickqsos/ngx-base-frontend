import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../shared/base.component';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Todos } from '../../models/todos.model';
import { LangService } from '../../../shared/services/lang.service';
import { DemoService } from '../../services/demo.service';
import { fadeInAnim, slideInLeftAnim } from '../../../shared/animations/template.animation';

@Component({
    selector: 'demo-grid-empty',
    templateUrl: './grid-empty.component.html',
    animations: [fadeInAnim, slideInLeftAnim],
    host: {class: 'container-fluid', '[@fadeInAnim]': 'true'}
})
export class GridEmptyComponent extends BaseComponent implements OnInit, AfterViewInit {

    dataSource: MatTableDataSource<Todos> = new MatTableDataSource<Todos>();

    displayedColumns = ['userId', 'id', 'title',  'completed'];
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public langService: LangService,
        public demoService: DemoService
    ) {
        super();
    }

    ngOnInit(): void {
        this.demoService.getTodos()
        .subscribe(
            response => {
                this.dataSource.data = [];
            }
        );
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }
}
