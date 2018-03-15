import { NgModule } from '@angular/core';

import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule
} from '@angular/material';

import { ClassTipoNotificacionPipe } from './pipes/class-tipo-notificacion.pipe';
import { IconTipoNotificacionPipe } from './pipes/icon-tipo-notificacion.pipe';
import { HoverCardDirective } from './directives/hover-card.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { JsonViewerComponent } from './json-viewer/json-viewer.component';
import { ErrorViewerComponent } from './error-viewer/error-viewer.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { CellPositionDirective } from './directives/cell-position.directive';


/**
 * Shared modulo que importa y exporta los modulos necesarios para material design, tambien exporta directivas y pipes.
 * @export
 * @class SharedModule
 */
@NgModule({
    declarations: [
        ClassTipoNotificacionPipe,
        IconTipoNotificacionPipe,
        
        HoverCardDirective,
        AutofocusDirective,
        CellPositionDirective,
        
        ConfirmDialogComponent,
        JsonViewerComponent,
        ErrorViewerComponent
    ],
    imports: [
        CommonModule,
        // Modulos para material design.
        MatAutocompleteModule,
        MatProgressBarModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        // Modulos para formularios.
        FormsModule,
        ReactiveFormsModule,
        // Modulo para flex layout.
        FlexLayoutModule
    ],
    exports: [
        MatAutocompleteModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatProgressBarModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        ClassTipoNotificacionPipe,
        IconTipoNotificacionPipe,
        
        HoverCardDirective,
        AutofocusDirective,
        CellPositionDirective,
        
        ConfirmDialogComponent,
        JsonViewerComponent,
        ErrorViewerComponent
    ],
    entryComponents: [
        ConfirmDialogComponent
    ]
})
export class SharedModule { }