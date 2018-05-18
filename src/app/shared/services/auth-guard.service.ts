import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { ContextoService } from './contexto.service';
import { NotificacionService } from './notificacion.service';

@Injectable()
/**
 * Clase AuthGuardService
 * Esta clase es un guard que determina si el usuario puede acceder a las urls solicitadas.
 */
export class AuthGuardService implements CanActivate {

  /**
   * Constructor de la clase
   * @param authService Servicio de autenticación.
   * @param router Router.
   */
  constructor(
      private authService: AuthService,
      private contextService: ContextoService,
      private notificacionService: NotificacionService,
      private router: Router
  ) {}

  /**
   * Funcion canActivate
   * Permite saber si el usuario esta o no autenticado y si esta autenticado valida que tenga el recurso asignado en el contexto comun.
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Extrae la url actual de la solicitud.
    const url: string = state.url;
    // Valida si el usuario esta autenticado.
    if (this.authService.isUserAuthenticated()) {
      // Valida si la url deberia ser verificada en el contexto.
      if (route.data.checkRecurso) {
        if (this.contextService.checkRecurso(url)) {
          return true;
        } else {
          this.router.navigate(['/unauthorized']);
          return false;
        }
      } else {
        return true;
      }
    } else {
      // Setea la url de retorno.
      this.authService.returnUrl = url;
      this.router.navigate(['/login']);
      return false;
    }
  }
}
