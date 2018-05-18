import { Pipe, PipeTransform } from '@angular/core';
import { eTipoNotificacion } from '../../shared/enums/tipo-notificacion.enum';

@Pipe({name: 'classTipoNotificacion'})
export class ClassTipoNotificacionPipe implements PipeTransform {
  transform(value: eTipoNotificacion, initialClass: string): string {
    let cls = '';

    if (initialClass) {
        cls = `${initialClass} `;
    }

    switch (value) {
        case eTipoNotificacion.Correcto:
            return `${cls}correcto`;
        case eTipoNotificacion.Incorrecto:
            return `${cls}incorrecto`;
        case eTipoNotificacion.Advertencia:
            return `${cls}advertencia`;
        case eTipoNotificacion.Informativo:
            return `${cls}informativo`;
        default:
            return `${cls}correcto`;
    }
  }
}
