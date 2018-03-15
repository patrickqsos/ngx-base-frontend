import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
/**
 * Directiva para posicionar un mat cell.
 * 
 * @export
 * @class CellPositionDirective
 */
@Directive({
    selector: '[sCellPosition]',
})
export class CellPositionDirective implements OnInit{
    
    @Input('sCellPosition') position: string;

    
    /**
     * Ctor de la directiva.
     */
    constructor(
        public elementRef: ElementRef
    ) {
        
    }

    /**
     * Evento on init.
     * 
     * @memberof CellPositionDirective
     */
    ngOnInit() {
        this.elementRef.nativeElement.style.display = 'flex';
        this.elementRef.nativeElement.style.justifyContent = this.position;
    }
 }