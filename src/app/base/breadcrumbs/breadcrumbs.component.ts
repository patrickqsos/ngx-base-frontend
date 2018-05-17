import { Component, OnInit } from '@angular/core';
import { LangService } from '../../shared/services/lang.service';
import { BaseComponent } from '../../shared/base.component';
import { AuthService } from '../../shared/services/auth.service';
import { ContextoService } from '../../shared/services/contexto.service';
import { fadeInLeftAnim, breadItemAnim } from '../../shared/animations/template.animation';

/**
 * Componente para manejar las migas de pan.
 * 
 * @export
 * @class BreadcrumbsComponent
 * @extends {BaseComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'base-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    animations: [fadeInLeftAnim, breadItemAnim]
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {
    
    /**
     * Creates an instance of BreadcrumbsComponent.
     * @param {LangService} langService 
     * @param {AuthService} authService 
     * @param {ContextoService} contextoService 
     * @memberof BreadcrumbsComponent
     */
    constructor(
        public langService: LangService,
        public authService: AuthService,
        public contextoService: ContextoService,
        
    ) { 
        super();
    }

    /**
     * Métotod que se ejecuta cuando se hace click en un item del array de migas de pan.
     * 
     * @param {any} pItem Item clickeado.
     * @param {any} pindex Index dle item clickeado.
     * @memberof BreadcrumbsComponent
     */
    onBreadClick(pItem, pindex) {
        // Carga los recursos hijos del elemento clickeado.
        this.contextoService.listaMenu = pItem.RecursosHijos;
        // Remuevo los items que esten despues del item clickeado en el array de migas de pan. 
        this.contextoService.breadCrumbs.length = pindex + 1;
    }

    /**
     * Método que se ejecuta cuando se hace click en el boton inicio.
     * 
     * @memberof BreadcrumbsComponent
     */
    onHomeClick() {
        // Vacia el array de migas de pan.
        this.contextoService.breadCrumbs = [];
        // Carga el menu inicial.
        this.contextoService.listaMenu = this.contextoService.getListaSchemas();
    }

    /**
     * Hook on init del componente.
     * 
     * @memberof BreadcrumbsComponent
     */
    ngOnInit(): void { }
}
