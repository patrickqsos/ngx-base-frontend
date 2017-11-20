/* Import Angular NgModule */
import { NgModule } from '@angular/core';

/* Import Angular CommonModule */
import { CommonModule } from '@angular/common';

/* Import Angular Router and Routes Module */
import { RouterModule, Routes } from '@angular/router';

/* Import Angular FormsModule */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Import App Mensajes Service */
import { MensajesService } from './parametros/mensajesServices';

/* Import Angular Material Flex Layout Module */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Import App Auth Guard */
import { AuthGuardService } from './services/AuthGuard.service';

/*Import Angular Material Module*/
import {
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
} from '@angular/material';

/* Import App Layout Component*/
import { LayoutComponent } from './layout/layout.component';

/* Import App Log In Component */
import { LoginComponent } from './login/login.component';

/* Import Menu Component */
import { MenuComponent } from './menu/menu.component';


// Configuración de las rutas
export const baseRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MenuComponent
  ],
  providers: [MensajesService],
  exports: [LayoutComponent]
})
export class BaseModule {}