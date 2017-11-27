import { Pipe, PipeTransform } from '@angular/core';
import { eTipoMensaje } from '../../shared/enums/tipo-mensaje.enum';


@Pipe({name: 'getClassTipoMensaje'})
export class ClassTipoMensajePipe implements PipeTransform {
  transform(value: eTipoMensaje): string {
    switch(value){
        case eTipoMensaje.Correcto:
            return "correcto";
        case eTipoMensaje.Incorrecto:
            return "incorrecto";
        case eTipoMensaje.Advertencia:
            return "advertencia";
        case eTipoMensaje.Informativo:
            return "informativo";
        default:
            return "correcto";
    }
  }
}