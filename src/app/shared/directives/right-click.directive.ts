import { Directive, HostListener } from '@angular/core';

/**
 * Directiva para deshabilitar el click derecho.
 *
 * @export
 * @class RightClickOffDirective
 */
@Directive({
    selector: '[shRightClickOff]'
})
export class RightClickOffDirective {

    /**
     * Detecta el evento contextmenu y hace que no aparezca el menu.
     *
     * @returns {boolean}
     * @memberof RightClickOffDirective
     */
    @HostListener('contextmenu') onRightClick(): boolean {
        return false;
    }
}
