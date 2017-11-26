import { Component } from '@angular/core';
import { ContextoService } from '../services/contexto.service';
import { BaseComponent } from '../base.component';
@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls:['menu.component.css']
})

export class MenuComponent extends BaseComponent{

    constructor(public contextoService: ContextoService) { super() }
}