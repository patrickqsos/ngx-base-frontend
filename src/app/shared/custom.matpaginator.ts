import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from '@angular/core';
import { LangService } from './services/lang.service';
import { eModulo } from './enums/modulo.enum';

/**
 * Clase para reemplazar los label del mat paginator.
 *
 * @export
 * @class CustomMatPaginator
 * @extends {MatPaginatorIntl}
 */
@Injectable()
export class CustomMatPaginator extends MatPaginatorIntl {

    /**
     * Creates an instance of CustomMatPaginator.
     * @param {LangService} langService
     * @memberof CustomMatPaginator
     */
    constructor(private langService: LangService) {
        super();

        this.itemsPerPageLabel = langService.getLang(eModulo.Base, 'mat-ITEMS_PER_PAGE');
        this.nextPageLabel = langService.getLang(eModulo.Base, 'mat-NEXT_PAGE');
        this.previousPageLabel = langService.getLang(eModulo.Base, 'mat-PREVIOUS_PAGE');
        this.firstPageLabel = langService.getLang(eModulo.Base, 'mat-FIRST_PAGE');
        this.lastPageLabel = langService.getLang(eModulo.Base, 'mat-LAST_PAGE');

        this.changes.next();
    }

    /**
     * Obtiene la etiqueta 'from'.
     *
     * @memberof CustomMatPaginator
     */
    getRangeLabel = (page: number, pageSize: number, length: number) =>  {
        if (length === 0 || pageSize === 0) {
            return `0 ${this.langService.getLang(eModulo.Base, 'mat-FROM')} ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} ${this.langService.getLang(eModulo.Base, 'mat-FROM')} ${length}`;
    }
}
