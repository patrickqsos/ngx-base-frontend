import { Injectable } from '@angular/core';
import { BaseLang } from '../../base/base.lang';
import { eModulo } from '../../shared/enums/modulo.enum';
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
  private langs: { id: any, contenido: any }[] = [];

  /**
   * Ctor del servicio, carga los langs de todos los módulos.
   * @memberof LangService
   */
  constructor(private contextoService: ContextoService) {
    this.langs.push(
      {
        id: eModulo.Base,
        contenido: BaseLang
      });
  }

  /**
   * Método para obtener un lang del objeto de langs cargados.
   *
   * @param {string} pModulo Identificador del modulo.
   * @param {string} pIdMensaje Identificador del mensaje.
   * @returns {string} Valor del lang.
   * @memberof ContextoService
   */
  getLang(pModulo: eModulo, pIdMensaje: string): string {

    // Obtiene idioma actual.
    const idioma = this.contextoService.getIdiomaActual();
    // Valida params de entrada.
    if (pModulo != null && pIdMensaje != null) {
      const lang = this.langs[pModulo].contenido[idioma][pIdMensaje];
      if (lang != null) {
        return lang;
      } else {
        return BaseLang[idioma]['lang-error'];
      }
    } else {
      return BaseLang[idioma]['lang-param-error'];
    }
  }
}
