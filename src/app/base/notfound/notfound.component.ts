import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { LangService } from '../../shared/services/lang.service';
import { fadeInAnim } from '../../shared/animations/template.animation';
import { ContextoService } from '../../shared/services/contexto.service';

/**
 * Componente para mostrar la pagina 404 not found.
 *
 * @export
 * @class NotfoundComponent
 * @extends {BaseComponent}
 */
@Component({
    selector: 'base-notfound',
    templateUrl: './notfound.component.html',
    styleUrls: ['./notfound.component.css'],
    animations: [fadeInAnim],
    host: { '[@fadeInAnim]': '' }
})
export class NotfoundComponent extends BaseComponent  {

    /**
     * Creates an instance of NotfoundComponent.
     * @param {LangService} langService
     * @memberof NotfoundComponent
     */
    constructor(
        public langService: LangService,
        public contextoService: ContextoService

    ) { super(); }

    onHomeClick(): void {
        this.contextoService.breadCrumbs = [];
    }
}
