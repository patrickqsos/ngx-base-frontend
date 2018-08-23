import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

/**
 * Directiva para controlar el evento hover en un row.
 *
 * @export
 * @class RowHoverDirective
 */
@Directive({
    selector: '[shRowHover]'
})
export class RowHoverDirective {

    /**
     *Creates an instance of RowHoverDirective.
     * @param {ElementRef} elementRef
     * @param {Renderer2} renderer
     * @memberof RowHoverDirective
     */
    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2
    ) {}

    /**
     * HostListener del evento mouseover.
     *
     * @memberof RowHoverDirective
     */
    @HostListener('mouseover') mouseover(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'row-hover');
    }

    /**
     * HostListener del evento mouseout.
     *
     * @memberof RowHoverDirective
     */
    @HostListener('mouseout') mouseout(): void {
        this.renderer.removeClass(this.elementRef.nativeElement, 'row-hover');
    }
}
