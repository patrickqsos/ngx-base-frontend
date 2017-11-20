import {Component} from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { MensajesService } from '../parametros/mensajesServices';
import { lang } from '../parametros/lang';
import { ConfigService } from '../parametros/config.service';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css'],
   // host: {class: 'myFoo'}
})
export class LayoutComponent {
    private idioma: string;
    private nombreSistema: string;
    private versionSistema: string;
    
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

    constructor(private auth: AuthService, private msn: MensajesService, private configService: ConfigService) {
        this.idioma = this.configService.getConfig("lang");
        this.nombreSistema = this.configService.getConfig("nombreSistema");
        this.versionSistema = this.configService.getConfig("versionSistema");
    }

    cambiarIdioma(pIdioma: string) {
        this.msn.setNuevoLanguage(pIdioma);
        this.idioma = pIdioma;
    }
}
