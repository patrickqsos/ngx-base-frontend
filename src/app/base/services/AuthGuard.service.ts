import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { AuthService }    from './AuthService.service';
import { Router }         from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router){

  }
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
    //return this.auth.getUserToken()
  }
}