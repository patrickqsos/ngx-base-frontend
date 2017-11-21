import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { AuthService }    from './AuthService.service';
import { Router }         from '@angular/router';

@Injectable()
/**
 * Clase AuthGuardService
 * Esta clase es un guard que determina si el usuario puede acceder a las urls solicitadas.
 */
export class AuthGuardService implements CanActivate {

  /**
   * Constructor de la clase
   * @param auth 
   * @param router 
   */
  constructor(private auth: AuthService, private router: Router){

  }

  /**
   * Funcion canActivate
   * Permite saber si el usuario esta o no autenticado.
   */
  canActivate() {
    
    console.log(this.router.url);
    if(this.auth.isUserAuthenticated())
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