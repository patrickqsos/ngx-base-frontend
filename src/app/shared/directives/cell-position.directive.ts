import { Directive, ElementRef, Renderer2, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
/**
 * Directiva para posicionar un mat cell.
 *
 * @export
 * @class CellPositionDirective
 */
@Directive({
    selector: '[shCellPosition]'
})
export class CellPositionDirective implements OnInit, OnChanges {

    @Input('shCellPosition') position: string;

    /**
     * Ctor de la directiva.
     */
    constructor(
        public elementRef: ElementRef
    ) { }

    /**
     * Evento on init.
     *
     * @memberof CellPositionDirective
     */
    ngOnInit(): void {
        this.elementRef.nativeElement.style.display = 'flex';
        this.elementRef.nativeElement.style.justifyContent = this.position;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.position) {
            this.elementRef.nativeElement.style.justifyContent = this.position;
        }
    }
 }
