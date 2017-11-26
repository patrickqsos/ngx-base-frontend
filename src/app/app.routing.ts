/* Import Angular Router Module and Routes */
import { Routes, RouterModule } from '@angular/router';
 
/* Import App Login Component */
import { LoginComponent }  from './base/login/login.component';

/* Import Menu Component */
import { MenuComponent }  from './base/menu/menu.component';

/* Import App Auth Guard */
import { AuthGuardService } from './base/services/auth-guard.service';
import { NotfoundComponent } from './base/notfound/notfound.component';
 
/* Configuracion de las rutas de la aplicacion base */
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService]},
  // otherwise redirect to home
  { path: '**', component: NotfoundComponent }
  
];
 
export const appRoutingProviders: any[] = [
];
