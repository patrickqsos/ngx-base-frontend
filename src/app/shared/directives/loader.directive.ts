import { Directive, OnInit, ElementRef } from '@angular/core';

/**
 * Directiva para delimitar el tamaño del componente shared-loader-spinner.
 *
 * @export
 * @class LoaderDirective
 * @implements {OnInit}
 */
@Directive({
    selector: '[shLoader]'
})
export class LoaderDirective implements OnInit {

    /**
     * Ctor de la directiva.
     */
    constructor(
        public elementRef: ElementRef
    ) { }

    /**
     * Evento on init.
     *
     * @memberof TableDirective
     */
    ngOnInit(): void {
        this.elementRef.nativeElement.style.position = 'relative';
    }
}
