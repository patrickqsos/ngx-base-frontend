import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[shAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {

    constructor(public elementRef: ElementRef) {
    }

    ngAfterViewInit(): void {
      this.elementRef.nativeElement.focus();
    }

    focus(): void {
        this.elementRef.nativeElement.focus();
    }
}
