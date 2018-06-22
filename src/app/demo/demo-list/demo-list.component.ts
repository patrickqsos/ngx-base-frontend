import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { zoomInAnim } from '../../shared/animations/template.animation';

@Component({
    selector: 'demo-list',
    templateUrl: './demo-list.component.html',
    animations: [zoomInAnim]
})
export class DemoListComponent extends BaseComponent implements OnInit {

    listaDemo: Array<any> = [];

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        super();
    }

    onDemoSelected(menu): void {
        this.router.navigate([menu.demoRoute], {relativeTo: this.route});
    }

    ngOnInit(): void {
        this.listaDemo.push(
            {
                demoRoute: 'registry',
                demoNombre: 'Registry'
            },
            {
                demoRoute: 'editor',
                demoNombre: 'Editor WYSIWYG'
            }
        );
    }
}
