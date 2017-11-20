import {Component} from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { MensajesService } from '../parametros/mensajesServices';
import { lang } from '../parametros/lang';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
   // host: {class: 'myFoo'}
})
export class LayoutComponent {
    private idioma: string;
    public fechaActual = new Date();

    listaRecursos = [
        {
          name: 'Archivos',
        },
        {
          name: 'Parametros',
        },
        {
          name: 'Seguridad',
        }
      ];

    constructor(private auth: AuthService, private msn: MensajesService) {
        this.idioma = lang;
    }

    cambiarIdioma(pIdioma: string) {
        this.msn.setNuevoLanguage(pIdioma);
        this.idioma = pIdioma;
    }
}
