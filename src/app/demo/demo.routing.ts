import { Routes } from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { RegistryComponent } from './registry/registry.component';
import { TagsComponent } from './tags/tags.component';

// Configuración de las rutas
export const demoRoutes: Routes = [
    { path: '', component: RegistryComponent },
    { path: ':repo/tags', component: TagsComponent }
    // { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    // { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    // { path: 'unauthorized', component: UnauthorizedComponent }
];
