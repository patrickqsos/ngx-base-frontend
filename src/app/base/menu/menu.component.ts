import { Component, OnInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../shared/base.component';
import { ContextoService } from '../../shared/services/contexto.service';
import { LangService } from '../../shared/services/lang.service';

/** 
 * Componente para mostrar el menu del sistema.
 * 
 * @export
 * @class MenuComponent
 * @extends {BaseComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls:['menu.component.css'],
    animations: [
        trigger('divMenu', [
            transition('void => *', [
                style({
                  opacity: 0,
                  transform: 'scale(0.2)'
                }),
                animate(400)
              ]),
            // transition('* => void', 
            //     animate(500, style({
            //         transform: 'scale(0.5)',
            //         opacity: 0,
            //     }))
            // )
        ]),
        trigger('divHome', [
            transition('void => *', [
                style({
                  opacity: 0,
                  transform: 'translateX(-100%)'
                }),
                animate(500)
            ]),
            // transition('* => void', 
            //     animate(500, style({
            //         transform: 'scale(0.5)',
            //         opacity: 0,
            //     }))
            // )
        ]),

    ]
})
export class MenuComponent extends BaseComponent implements OnInit{

    // Lista de items del menu.
    public listaMenu: any[] = []; 

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
    ) { super() }

    /**
     * Evento que sucede cuando se seleccina un item del menu.
     * 
     * @param {*} pMenu Item seleccionado.
     * @memberof MenuComponent
     */
    onMenuSelected(pMenu: any): void {
        
        // Obtiene sus items hijos.
        this.listaMenu = pMenu.RecursosHijos;
        
        // Si el item seleccionado tiene una ruta cargada, se usa el router para cargarla.
        if(pMenu.Ejecutable != null) {
            this.router.navigate([pMenu.Ejecutable])
        }
    }

    /**
     * Evento que sucede cuando se selecciona el item Inicio del menu.
     * 
     * @memberof MenuComponent
     */
    onHomeSelected(): void {
        this.listaMenu = this.contextoService.getListaSchemas();
    }

    /**
     * Hook on init del componente.
     * 
     * @memberof MenuComponent
     */
    ngOnInit(){
        this.listaMenu = this.contextoService.getListaSchemas();
    }
}