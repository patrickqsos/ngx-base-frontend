import { Pipe, PipeTransform } from '@angular/core';
import { eTipoNotificacion } from '../../shared/enums/tipo-notificacion.enum';


@Pipe({name: 'iconTipoNotificacion'})
export class IconTipoNotificacionPipe implements PipeTransform {
  transform(value: eTipoNotificacion): string {
    switch(value){
        case eTipoNotificacion.Correcto:
            return "done";
        case eTipoNotificacion.Incorrecto:
            return "close";
        case eTipoNotificacion.Advertencia:
            return "warning";
        case eTipoNotificacion.Informativo:
            return "info";
        default:
            return "done";
    }
  }
}