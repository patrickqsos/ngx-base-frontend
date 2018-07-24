import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { fadeInAnim, slideInLeftAnim, lightSpeedInAnim, zoomInAnim, bounceInAnim } from '../../../shared/animations/template.animation';
import { MatPaginator, MatTableDataSource, MatSlideToggleChange, MatDialog } from '@angular/material';
import { Todos } from '../../models/todos.model';
import { BaseComponent } from '../../../shared/base.component';
import { LangService } from '../../../shared/services/lang.service';
import { DemoService } from '../../services/demo.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ContextoService } from '../../../shared/services/contexto.service';
import { takeUntil } from 'rxjs/operators';
import { GridModalComponent } from './grid-modal/grid-modal.component';
import { eTipoFlujo } from '../../enums/grid.enums';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'demo-grid-full',
    templateUrl: './grid-full.component.html',
    animations: [fadeInAnim, fadeInAnim],
    host: {class: 'container-fluid', '[@fadeInAnim]': 'true'}
})
export class GridFullComponent extends BaseComponent implements OnInit, OnDestroy, AfterViewInit {
    dataSource: MatTableDataSource<Todos> = new MatTableDataSource<Todos>();
    displayedColumns = ['select', 'id', 'userId', 'title',  'actions'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    selection: SelectionModel<Todos>;
    aligns: Array<string> = ['flex-start', 'center', 'flex-end'];
    alignSelected = 'center';
    search = 'single';
    searchTitle = '';
    searchId = '';

    constructor(
        public contextService: ContextoService,
        public langService: LangService,
        public demoService: DemoService,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute

    ) {
        super();
    }

    ngOnInit(): void {
        this.demoService.getTodos()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
            response => {
                this.dataSource.data = response;
                this.selection = new SelectionModel<Todos>(true, response.filter(r => r.completed === true));
            }
        );
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyFilterTitle(filterValue: string): void {
        this.dataSource.filterPredicate = (data: Todos, filter: string): boolean => {
            return data.title.toLowerCase().trim().indexOf(filter) !== -1;
        };

        this.dataSource.filter = filterValue;
    }

    applyFilterId(filterValue: string): void {
        this.dataSource.filterPredicate = (data: Todos, filter: string): boolean => {
            return data.id === +filter;
        };
        this.dataSource.filter = filterValue;
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    }

    emptyChanged(event: MatSlideToggleChange): void {
        if (event.checked) {
            this.dataSource.data = [];
        } else {
            this.demoService.getTodos()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                response => {
                    this.dataSource.data = response;
                    this.selection = new SelectionModel<Todos>(true, response.filter(r => r.completed === true));
                }
            );
        }
    }

    loadingChanged(event: MatSlideToggleChange): void {
        this.contextService.isLoading = event.checked;
    }

    checkChanged(event: MatSlideToggleChange): void {
        if (!event.checked) {
            this.displayedColumns.shift();
        } else {
            this.displayedColumns.unshift('select');
        }
    }

    clearSearch(): void {
        this.searchTitle = '';
        this.searchId = '';
        this.dataSource.filter = '';
    }

    openModalAdicionar(): void {
        const dialogRef = this.dialog.open(GridModalComponent, {
            disableClose: true,
            data: {
                tipoFlujo: eTipoFlujo.Create,
                titulo: 'Crear TODO'
            }
        });

        // dialogRef.afterClosed()
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe(
        //         (resultForm) => {
        //             if (resultForm) {
        //                 this.dataSource.data.push(resultForm.data);
        //                 this.dataSource.filter = '';
        //             }
        //         }
        //     );
    }

    openModalModificar(objSelected: Todos, index: number): void {
        const dialogRef = this.dialog.open(GridModalComponent, {
            disableClose: true,
            data: {
                tipoFlujo: eTipoFlujo.Update,
                objeto: objSelected,
                titulo: 'Modificar TODOS'
            }
            });
            // dialogRef.afterClosed()
            //     .pipe(takeUntil(this.unsubscribe$))
            //     .subscribe(
            //         (objPlantillaSeleccionadoBack: PlantillaModel) => {
            //             if (objPlantillaSeleccionadoBack) {
            //                 this.dataSource.data[index] = objPlantillaSeleccionadoBack;
            //                 this.dataSource.filter = '';
            //             }
            //         }
            //     );
    }

    openModalEliminacion(objEliminar: Todos, index: number): void {
        const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
            disableClose: true,
            data: {
                title: '¿Esta seguro de eliminar el registro?',
                color: 'primary'
            }
        });

        // confirmDialog.afterClosed().subscribe(result => {
        //     if (result) {
        //         // llamar al servicio para realizar la baja logica
        //         objPlantillaGrilla.transaccion = eTransacciones.Eliminar;
        //         objPlantillaGrilla.usuarioBitacora = this.contextService.getContexto().NombreUsuario;
        //         this.paramsService.plantillaEliminar(objPlantillaGrilla)
        //             .pipe(takeUntil(this.unsubscribe$))
        //             .subscribe(
        //                 () => {
        //                     this.dataSource.data = this.dataSource.data.filter(x => x.idPlantillas !== objPlantillaGrilla.idPlantillas);
        //                     this.dataSource.filter = '';
        //                 }
        //             );
        //     }
        // });
    }

    openEditFull(objSelected: Todos): void {
        this.demoService.todoSelected = objSelected;
        this.router.navigate(['edit', objSelected.id], {relativeTo: this.route});
    }
}
