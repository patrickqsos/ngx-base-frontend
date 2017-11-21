import { Component } from '@angular/core';
import { ContextoService } from '../services/contexto.service';
@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls:['menu.component.css']
})

export class MenuComponent{

    constructor(public contextoService: ContextoService) {}
}