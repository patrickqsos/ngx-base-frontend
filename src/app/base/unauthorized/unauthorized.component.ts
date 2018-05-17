import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { LangService } from '../../shared/services/lang.service';
import { fadeInAnim } from '../../shared/animations/template.animation';

/**
 * Componente para mostrar la pagina de acceso no autorizado.
 * 
 * @export
 * @class UnauthorizedComponent
 * @extends {BaseComponent}
 */
@Component({
  selector: 'base-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
  animations: [fadeInAnim],
  host: { '[@fadeInAnim]': '' }
})
export class UnauthorizedComponent extends BaseComponent  {

  /**
   * Creates an instance of NotfoundComponent.
   * @param {LangService} langService 
   * @memberof NotfoundComponent
   */
  constructor(
    public langService: LangService
  ) { super() }

}
