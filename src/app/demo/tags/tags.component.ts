import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { LangService } from '../../shared/services/lang.service';
import { ContextoService } from '../../shared/services/contexto.service';
import { DemoService } from '../services/demo.service';

@Component({
    selector: 'demo-tags',
    templateUrl: './tags.component.html'
})
export class TagsComponent extends BaseComponent implements OnInit {
    constructor(
        public langService: LangService,
        public contextService: ContextoService,
        private demoService: DemoService
    ) {
        super();
    }

    ngOnInit(): void {
        this.demoService.getTags()
            .subscribe(
                response => {
                    console.log(response);
                }
            );
    }
}
