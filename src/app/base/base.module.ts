import { ProgressBarComponent } from './progressbar/progressbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ErrorViewerComponent } from '../shared/error-viewer/error-viewer.component';

// Configuración de las rutas
export const baseRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
  { path: 'unauthorized', component: UnauthorizedComponent },
];

/**
 * Modulo base del sistema.
 * 
 * @export
 * @class BaseModule
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(baseRoutes),
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
    LoginComponent,
    MenuComponent,
    NotificacionComponent,
    NotfoundComponent,
    ProgressBarComponent,
    UnauthorizedComponent
  ],
  exports: [
    LayoutComponent,
    RouterModule,
  ],
  entryComponents: [
    NotificacionComponent,
    ErrorViewerComponent
  ],
})
export class BaseModule {}
