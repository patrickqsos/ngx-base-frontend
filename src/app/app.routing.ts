import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './base/notfound/notfound.component';

/* Configuracion de las rutas de la aplicacion base */
export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'notfound', component: NotfoundComponent, pathMatch: 'full'},
  { path: 'registry', loadChildren: './demo/demo.module#DemoModule'},
  { path: '**', component: NotfoundComponent, pathMatch: 'full' }
];
