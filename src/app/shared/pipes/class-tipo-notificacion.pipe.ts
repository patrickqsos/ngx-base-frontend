import { Pipe, PipeTransform } from '@angular/core';
import { eTipoNotificacion } from '../../shared/enums/tipo-notificacion.enum';


@Pipe({name: 'classTipoNotificacion'})
export class ClassTipoNotificacionPipe implements PipeTransform {
  transform(value: eTipoNotificacion): string {
    switch(value){
        case eTipoNotificacion.Correcto:
            return "correcto";
        case eTipoNotificacion.Incorrecto:
            return "incorrecto";
        case eTipoNotificacion.Advertencia:
            return "advertencia";
        case eTipoNotificacion.Informativo:
            return "informativo";
        default:
            return "correcto";
    }
  }
}