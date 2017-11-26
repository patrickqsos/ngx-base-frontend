import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

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
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Funcion canActivate
   * Permite saber si el usuario esta o no autenticado.
   */
  canActivate() {
    
    console.log(this.router.url);
    if(this.authService.isUserAuthenticated())
    {
      return true;
    }
    else
    {  
      this.router.navigate(['/login'])
      return false;
    }
  }
}