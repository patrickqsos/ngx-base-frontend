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
    MatPaginatorModule
} from '@angular/material'

import { ClassTipoMensajePipe } from './pipes/class-tipo-mensaje.pipe';
import { IconTipoMensajePipe } from './pipes/icon-tipo-mensaje.pipe';
import { HoverCardDirective } from './directives/hover-card.directive';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

/**
 * Shared modulo que importa y exporta los modulos necesarios para material design, tambien exporta directivas y pipes.
 * 
 * @export
 * @class SharedModule
 */
@NgModule({
    declarations: [
        ClassTipoMensajePipe,
        IconTipoMensajePipe,
        HoverCardDirective,
    ],
    imports: [
        CommonModule,
        // Modulos para material design.
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

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        ClassTipoMensajePipe,
        IconTipoMensajePipe,
        HoverCardDirective,
    ],
})
export class SharedModule { }