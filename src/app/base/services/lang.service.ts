import { Injectable } from '@angular/core';
import { BaseLang } from "../parametros/base.lang";
import { Modulos } from '../parametros/modulos.enum';
import { ContextoService } from './contexto.service';

/**
 * Servicio para manejar langs de forma global en el sistema.
 * 
 * @export
 * @class LangService
 */
@Injectable()
export class LangService {

  // Langs de todos los modulos.
  private langs: {id:any, contenido: any}[] = [];
  // Enum de modulos.
  public modulos = Modulos;

  /**
   * Ctor del servicio, carga los langs de todos los módulos.
   * @memberof LangService
   */
  constructor(private contextoService: ContextoService) {
    this.langs.push(
      {
        id:Modulos.Base,
        contenido: BaseLang
      });
  }

  /**
   * Método para obtener un lang del objeto de langs cargados.
   * 
   * @param {string} pModulo Identificador del modulo.
   * @param {string} pIdMensaje Identificador del mensaje.
   * @returns Valor del lang.
   * @memberof ContextoService
   */
  getLang(pModulo:Modulos, pIdMensaje: string) {
    if(pModulo != null && pIdMensaje != null){
      var lang = this.langs[pModulo].contenido[this.contextoService.getLenguajeActual()][pIdMensaje];
      if(lang != null)      
        return lang;
      else
        return BaseLang[this.contextoService.getLenguajeActual()]['lang-error'];  
    }    
    else
      return BaseLang[this.contextoService.getLenguajeActual()]['lang-param-error'];  
  }
}
