/* Import Angular Router Module and Routes */
import { Routes, RouterModule } from '@angular/router';
 
/* Import App Login Component */
import { LoginComponent }  from './login/login.component';

/* Import Menu Component */
import { MenuComponent }  from './menu/menu.component';
 
/* Configuracion de las rutas de la aplicacion base */
export const appRoutes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  
];
 
export const appRoutingProviders: any[] = [
];
