import { Directive, AfterViewInit, ElementRef } from '@angular/core';

/**
 * Directiva para dar autofocus a un elemento.
 *
 * @export
 * @class AutofocusDirective
 * @implements {AfterViewInit}
 */
@Directive({
    selector: '[shAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

    /**
     *Creates an instance of AutofocusDirective.
     * @param {ElementRef} elementRef
     * @memberof AutofocusDirective
     */
    constructor(public elementRef: ElementRef) {}

    /**
     * Hook AfterViewInit.
     *
     * @memberof AutofocusDirective
     */
    ngAfterViewInit(): void {
      this.elementRef.nativeElement.focus();
    }

    /**
     * Método para dar focus manual a un elemento que use esta directiva.
     *
     * @memberof AutofocusDirective
     */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
