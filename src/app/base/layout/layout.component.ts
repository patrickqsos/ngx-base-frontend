import {Component} from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { ContextoService } from '../services/contexto.service';
import { LangService } from '../services/lang.service';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
   // host: {class: 'myFoo'}
})
export class LayoutComponent {

    constructor(
      public auth: AuthService,
      public contextoService: ContextoService,
      public langService: LangService) {}
      
    /**
     * Método para manejar el evento selectionChange del select y cambiar el idioma del sistema usando el servicio de contexto.
     * 
     * @param {any} pEvent 
     * @memberof LayoutComponent
     */
    cambiarIdioma(pEvent) {
        this.contextoService.setNuevoIdioma(pEvent.value);
    }

    logout(){
      this.auth.logoutUser();
    }
}
