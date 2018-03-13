import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
    selector: '[autofocus]'
})
export class AutofocusDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) {
    }
   
    ngAfterViewInit() {
      this.elementRef.nativeElement.focus();
    }
 }