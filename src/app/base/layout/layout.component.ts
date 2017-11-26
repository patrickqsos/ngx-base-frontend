import {Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ContextoService } from '../services/contexto.service';
import { LangService } from '../services/lang.service';
import { UtilService } from '../services/util.service';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-layout',
    templateUrl: 'layout.component.html',
    styleUrls: ['layout.component.css']
})
export class LayoutComponent extends BaseComponent{

    /**
     * Creates an instance of LayoutComponent.
     * @param {auth-service} auth Servicio de autenticación.
     * @param {ContextoService} contextoService Servicio de contexto.
     * @param {LangService} langService Servicio lang.
     * @param {UtilService} utilService Servicio utilitario.
     * @memberof LayoutComponent
     */
    constructor(
      public authService: AuthService,
      public contextoService: ContextoService,
      public langService: LangService,
      public utilService: UtilService) {super()}
}
