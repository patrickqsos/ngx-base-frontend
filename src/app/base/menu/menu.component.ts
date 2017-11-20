import { Component } from '@angular/core';
import { MenuService } from '../services/Menu.service';
@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls:['menu.component.css']
})

export class MenuComponent{

    constructor(
        private menu: MenuService
    ){
        console.log(menu);
    }
}