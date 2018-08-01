import { Directive, AfterViewInit, ElementRef, HostListener, Output, EventEmitter, Renderer2, forwardRef } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from '../../../../node_modules/@angular/forms';

/* tslint:disable */
const UPPERCASE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UppercaseDirective),
    multi: true
};
/* tslint:enable */

/**
 * Directiva para hacer que el value de un input sea en mayusculas.
 *
 * @export
 * @class UppercaseDirective
 * @implements {AfterViewInit}
 */
@Directive({
    selector: '[shUppercase]',
    providers: [
        UPPERCASE_VALUE_ACCESSOR
    ]
})
export class UppercaseDirective extends DefaultValueAccessor implements AfterViewInit  {

    /**
     *Creates an instance of UppercaseDirective.
     * @param {ElementRef} elementRef
     * @memberof UppercaseDirective
     */
    constructor(renderer: Renderer2, public elementRef: ElementRef) {
        super(renderer, elementRef, false);
    }

    /**
     * Hook AfterViewInit.
     *
     * @memberof UppercaseDirective
     */
    ngAfterViewInit(): void {
        this.elementRef.nativeElement.style.textTransform = 'uppercase';
    }

    /**
     * HostListener para detectar el evento input y hacer la transformación a uppercase.
     *
     * @param {*} $event
     * @memberof UppercaseDirective
     */
    @HostListener('input', ['$event']) onInputChange($event): void {
        const transformed = this.transformValue($event.target.value);
        super.writeValue(transformed);
        this.onChange(transformed);
    }

    /**
     * HostListener para detectar el evento blur.
     *
     * @param {*} $event
     * @memberof UppercaseDirective
     */
    @HostListener('blur') onBlur(): void {
        this.onTouched();
    }

    /**
     * Método que trasnforma el valor.
     *
     * @private
     * @param {*} value
     * @returns {*}
     * @memberof UppercaseDirective
     */
    private transformValue(value: any): any {
        const result = value && typeof value === 'string' ? value.toUpperCase() : value;
        return result;
    }
}
