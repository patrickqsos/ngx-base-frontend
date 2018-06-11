import { Injectable } from '@angular/core';
import { baseLang } from '../../base/base.lang';
import { eModulo } from '../../shared/enums/modulo.enum';
import { ContextoService } from './contexto.service';
import { demoLang } from '../../demo/demo.lang';

/**
 * Servicio para manejar langs de forma global en el sistema.
 *
 * @export
 * @class LangService
 */
@Injectable()
export class LangService {

  // Langs de todos los modulos.
  private langs: Array<{ id: eModulo, contenido: any }> = [];

  /**
   * Ctor del servicio, carga los langs de todos los módulos.
   * @memberof LangService
   */
  constructor(private contextoService: ContextoService) {
    this.langs.push(
      {
        id: eModulo.Base,
        contenido: baseLang
      },
      {
        id: eModulo.Demo,
        contenido: demoLang
      }
    );
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
    if (pModulo !== undefined && pIdMensaje !== undefined) {
      const lang = this.langs[pModulo].contenido[idioma][pIdMensaje];
      if (lang) {
        return lang;
      } else {
        return baseLang[idioma]['lang-error'];
      }
    } else {
      return baseLang[idioma]['lang-param-error'];
    }
  }
}
