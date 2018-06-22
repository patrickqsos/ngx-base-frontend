import { Routes } from '@angular/router';
import { RegistryComponent } from './registry/registry.component';
import { TagsComponent } from './tags/tags.component';
import { DemoListComponent } from './demo-list/demo-list.component';
import { TextEditorComponent } from './text-editor/text-editor.component';

// Configuración de las rutas
export const demoRoutes: Routes = [
    { path: '', component: DemoListComponent },
    { path: 'registry', component: RegistryComponent },
    { path: 'registry/:repo/tags', component: TagsComponent },
    { path: 'editor', component: TextEditorComponent }
    // { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    // { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    // { path: 'unauthorized', component: UnauthorizedComponent }
];
