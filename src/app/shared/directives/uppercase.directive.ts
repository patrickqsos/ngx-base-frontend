import { Directive, AfterViewInit, ElementRef } from '@angular/core';

/**
 * Directiva para hacer que el value de un input sea en mayusculas.
 *
 * @export
 * @class UppercaseDirective
 * @implements {AfterViewInit}
 */
@Directive({
    selector: '[shUppercase]'
})
export class UppercaseDirective implements AfterViewInit {

    /**
     *Creates an instance of UppercaseDirective.
     * @param {ElementRef} elementRef
     * @memberof UppercaseDirective
     */
    constructor(public elementRef: ElementRef) {}

    /**
     * Hook AfterViewInit.
     *
     * @memberof UppercaseDirective
     */
    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.textTransform = 'uppercase';
    }
}
