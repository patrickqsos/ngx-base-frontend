import {Component} from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { ContextoService } from '../services/contexto.service';
import { LangService } from '../services/lang.service';
import { UtilService } from '../services/util.service';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent {

    /**
     * Creates an instance of LayoutComponent.
     * @param {AuthService} auth Servicio de autenticación.
     * @param {ContextoService} contextoService Servicio de contexto.
     * @param {LangService} langService Servicio lang.
     * @param {UtilService} utilService Servicio utilitario.
     * @memberof LayoutComponent
     */
    constructor(
      public auth: AuthService,
      public contextoService: ContextoService,
      public langService: LangService,
      public utilService: UtilService) {}
      
    /**
     * Método para manejar el evento selectionChange del select y cambiar el idioma del sistema usando el servicio de contexto.
     * 
     * @param {any} pEvent 
     * @memberof LayoutComponent
     */
    cambiarIdioma(pEvent):void {
        this.contextoService.setNuevoIdioma(pEvent.value);
    }
}
