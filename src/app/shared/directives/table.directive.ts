import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[shTable]'
})
export class TableDirective implements OnInit {

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
