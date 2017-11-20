import {Component} from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { MensajesService } from '../parametros/mensajesServices';
import { lang } from '../parametros/lang';
import { MenuService } from '../services/Menu.service';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
   // host: {class: 'myFoo'}
})
export class LayoutComponent {
    public idioma: string;
    public fechaActual = new Date();

    constructor(
      public auth: AuthService,
      private msn: MensajesService,
      private menuList: MenuService) {
      
        this.idioma = lang;
    }

    cambiarIdioma(pIdioma: string) {
        this.msn.setNuevoLanguage(pIdioma);
        this.idioma = pIdioma;
    }

    logout(){
      this.auth.logoutUser();
    }
}
