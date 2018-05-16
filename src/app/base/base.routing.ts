import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuardService } from "../shared/services/auth-guard.service";
import { MenuComponent } from "./menu/menu.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";

// Configuración de las rutas
export const baseRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LoginComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService], data: {checkRecurso: false} },
    { path: 'unauthorized', component: UnauthorizedComponent }
];