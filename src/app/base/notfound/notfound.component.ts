import { Component } from '@angular/core';
import { BaseComponent } from '../../shared/base.component';
import { LangService } from '../../shared/services/lang.service';

/**
 * Componente para mostrar la pagina 404 not found.
 * 
 * @export
 * @class NotfoundComponent
 * @extends {BaseComponent}
 */
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
})
export class NotfoundComponent extends BaseComponent  {

  /**
   * Creates an instance of NotfoundComponent.
   * @param {LangService} langService 
   * @memberof NotfoundComponent
   */
  constructor(
    public langService: LangService
  ) { super() }

}
