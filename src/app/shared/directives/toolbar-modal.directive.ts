import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

/**
 * Directiva para los toolbar de una modal.
 *
 * @export
 * @class ToolbarModalDirective
 * @implements {OnInit}
 */
@Directive({
    selector: '[shToolbarModal]'
})
export class ToolbarModalDirective implements OnInit {

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
        this.renderer.addClass(this.elementRef.nativeElement, 'toolbar-modal');
    }
}
