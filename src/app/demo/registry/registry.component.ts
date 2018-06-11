import { Component, OnInit } from '@angular/core';
import { LangService } from '../../shared/services/lang.service';
import { BaseComponent } from '../../shared/base.component';
import { fadeInAnim, slideInLeftAnim } from '../../shared/animations/template.animation';
import { MatTableDataSource } from '@angular/material';
import { DemoService } from '../services/demo.service';
import { ContextoService } from '../../shared/services/contexto.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'demo-registry',
    templateUrl: './registry.component.html',
    styleUrls: ['./registry.component.css'],
    animations: [fadeInAnim, slideInLeftAnim],
    host: {class: 'container-fluid', '[@fadeInAnim]': 'true'}
})
export class RegistryComponent extends BaseComponent implements OnInit {

    displayedColumns = ['repository', 'acciones'];
    dataSource: MatTableDataSource<{repo: string}> = new MatTableDataSource<{repo: string}>();

    constructor(
        public langService: LangService,
        public contextService: ContextoService,
        private demoService: DemoService,
        public router: Router,
        private route: ActivatedRoute
    ) {
        super();
    }

    onTag(row: string): void {
        this.demoService.selectedRepo = row;
        this.router.navigate([row, 'tags']);
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    ngOnInit(): void {
        this.demoService.getCatalog()
            .subscribe(
                response => {
                    this.dataSource.data = response.repositories;
                }
            );
    }
}
