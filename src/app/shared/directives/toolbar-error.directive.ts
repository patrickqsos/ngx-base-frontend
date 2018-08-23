import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

/**
 * Directiva para los toolbar de error en un dialog.
 *
 * @export
 * @class ToolbarModalDirective
 * @implements {OnInit}
 */
@Directive({
    selector: '[shToolbarError]'
})
export class ToolbarErrorDirective implements OnInit {

    /**
     * Ctor de la directiva.
     */
    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2

    ) { }

    /**
     * Evento on init.
     *
     * @memberof ToolbarModalDirective
     */
    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'toolbar-error');
    }
}
