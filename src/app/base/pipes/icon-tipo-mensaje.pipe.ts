import { Pipe, PipeTransform } from '@angular/core';
import { eTipoMensaje } from '../../general/enums/tipo-mensaje.enum';


@Pipe({name: 'getIconTipoMensaje'})
export class IconTipoMensajePipe implements PipeTransform {
  transform(value: eTipoMensaje): string {
    switch(value){
        case eTipoMensaje.Correcto:
            return "done";
        case eTipoMensaje.Incorrecto:
            return "close";
        case eTipoMensaje.Advertencia:
            return "warning";
        case eTipoMensaje.Informativo:
            return "info";
        default:
            return "done";
    }
  }
}