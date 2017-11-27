import { Directive, Input, HostListener, Renderer, ElementRef, Renderer2 } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
/**
 * Directiva para manejar una card hover.
 * 
 * @export
 * @class HoverCardDirective
 */
@Directive({ 
    selector: '[hoverCard]'
})
export class HoverCardDirective implements OnInit {

    /**
     * Clase a agregar cuando el card tenga hover.
     * 
     * @type {string}
     * @memberof HoverCardDirective
     */
    @Input() hoverClass: string;

    /**
     * Clase a agregar cuando el card no tenga hover.
     * 
     * @type {string}
     * @memberof HoverCardDirective
     */
    @Input() notHoverClass: string;
  
    /**
     * Creates an instance of HoverCardDirective.
     * @param {ElementRef} elementRef 
     * @param {Renderer2} renderer 
     * @memberof HoverCardDirective
     */
    constructor(
        public elementRef: ElementRef,
        private renderer: Renderer2
    ) {}
 
    ngOnInit(){
        this.renderer.addClass(this.elementRef.nativeElement, this.notHoverClass);
    }

    /**
     * HostListener del evento mouseover.
     * 
     * @memberof HoverCardDirective
     */
    @HostListener('mouseover') cardHover() {

        this.renderer.addClass(this.elementRef.nativeElement.lastElementChild, 'animate-icon-menu');
        this.renderer.removeClass(this.elementRef.nativeElement, this.notHoverClass);
        this.renderer.addClass(this.elementRef.nativeElement, this.hoverClass);
    }

    /**
     * HostListener del evento mouseout.
     * 
     * @memberof HoverCardDirective
     */
    @HostListener('mouseout') cardNotHover() {
        this.renderer.removeClass(this.elementRef.nativeElement.lastElementChild, 'animate-icon-menu');
        this.renderer.removeClass(this.elementRef.nativeElement, this.hoverClass);
        this.renderer.addClass(this.elementRef.nativeElement, this.notHoverClass);
    }
}