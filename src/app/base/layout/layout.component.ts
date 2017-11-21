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

    // Fecha actual.
    public fechaActual = new Date();

    constructor(
      public auth: AuthService,
      public contextoService: ContextoService,
      public langService: LangService) {}

    cambiarIdioma(pIdioma: string) {
        this.contextoService.setNuevoLenguaje(pIdioma);
    }

    logout(){
      this.auth.logoutUser();
    }
}
