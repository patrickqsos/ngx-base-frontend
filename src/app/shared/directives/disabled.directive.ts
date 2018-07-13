import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[shDisabled]'
})
export class DisabledDirective implements OnInit {

    /**
     * Ctor de la directiva.
     */
    constructor(
        public elementRef: ElementRef,
        public renderer: Renderer2

    ) { }

    /**
     * Evento on init.
     *
     * @memberof DisabledDirective
     */
    ngOnInit(): void {
        this.renderer.addClass(this.elementRef.nativeElement, 'form-field-disabled');
//        console.log(this.elementRef.nativeElement);

    }
}
