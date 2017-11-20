/* Import Angular Router Module and Routes */
import { Routes, RouterModule } from '@angular/router';
 
/* Import App Login Component */
import { LoginComponent }  from './login/login.component';

/* Import Menu Component */
import { MenuComponent }  from './menu/menu.component';

/* Import App Auth Guard */
import { AuthGuardService } from './services/AuthGuard.service';
 
/* Configuracion de las rutas de la aplicacion base */
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService]},
  
];
 
export const appRoutingProviders: any[] = [
];
