import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/base.component';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';
import { zoomInAnim, fadeInLeftAnim, breadListAnim } from '../../shared/animations/template.animation';
import { AutofocusDirective } from '../../shared/directives/autofocus.directive';

/**
 * Componente para mostrar el menu del sistema.
 *
 * @export
 * @class MenuComponent
 * @extends {BaseComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'base-menu',
    templateUrl: 'menu.component.html',
    animations: [zoomInAnim, fadeInLeftAnim, breadListAnim],
    host: {class: 'container-fluid'}
})
export class MenuComponent extends BaseComponent implements OnInit {

    /**
     * Viewchild para acceder al campo de búsqueda.
     *
     * @type {AutofocusDirective}
     * @memberof MenuComponent
     */
    @ViewChild(AutofocusDirective) searchField: AutofocusDirective;

    /**
     * Lista de menus de respaldo desde de iniciar una búsqueda.
     *
     * @type {Array<any>}
     * @memberof MenuComponent
     */
    backupList: Array<any>;

    /**
     * Creates an instance of MenuComponent.
     * @param {ContextoService} contextoService
     * @param {LangService} langService
     * @param {Router} router
     * @memberof MenuComponent
     */
    constructor(
        public contextoService: ContextoService,
        public langService: LangService,
        private router: Router
    ) { super(); }

    /**
     * Evento que sucede cuando se selecciona un item del menu.
     *
     * @param {*} pMenu Item seleccionado.
     * @memberof MenuComponent
     */
    onMenuSelected(pMenu: any): void {
        // Se agrega el menu al array de migas de pan.
        this.contextoService.breadCrumbs.push(pMenu);

        // Obtiene sus items hijos.
        this.contextoService.listaMenu = pMenu.RecursosHijos;

        // Si el item seleccionado tiene una ruta cargada, se usa el router para cargarla.
        if (pMenu.Ejecutable) {
            this.router.navigate([pMenu.Ejecutable]);
        } else if (this.searchField) {
            // Setea el focus en el buscador.
            this.searchField.focus();
        }
    }

    /**
     * Evento que sucede cuando se selecciona el item Inicio del menu.
     *
     * @memberof MenuComponent
     */
    onHomeSelected(): void {
        // Vacia array de migas de pan.
        this.contextoService.breadCrumbs = [];
        // Vuelve a cargar menu inicial
        this.contextoService.listaMenu = this.contextoService.getListaSchemas();
    }

    /**
     * Método que realiza la búsqueda de menus.
     *
     * @param {string} searchValue
     * @memberof MenuComponent
     */
    search(searchValue: string): void {
        searchValue = searchValue.toLowerCase().trim();

        if (searchValue) {
            if (!this.backupList) {
                this.backupList = this.contextoService.listaMenu;
            }
            this.contextoService.listaMenu = this.backupList.filter(s => s.Etiqueta.toLowerCase().includes(searchValue));
        } else if (searchValue === '') {
            this.contextoService.listaMenu = this.backupList;
            this.backupList = undefined;
        }

    }

    /**
     * Método que limpia los campos de búsqueda.
     *
     * @memberof MenuComponent
     */
    clearSearch(): void {
        this.contextoService.listaMenu = this.backupList;
        this.searchField.elementRef.nativeElement.value = '';
        this.backupList = undefined;
    }

    /**
     * Hook on init del componente.
     *
     * @memberof MenuComponent
     */
    ngOnInit(): void {
        if (this.contextoService.breadCrumbs.length === 0) {
            this.contextoService.listaMenu = this.contextoService.getListaSchemas();
        }
    }
}
