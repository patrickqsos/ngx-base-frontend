import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatSnackBar } from '@angular/material'
import { ContextoService } from './contexto.service';
import { LangService } from './lang.service';
import { Resultado } from '../parametros/resultado.entidad';

@Injectable()
export class AuthService {
  token: string;
  // todo: sacar esto a config.json
  urlBase: string = "http://localhost/pruebasRestful";

  constructor(
    private router: Router,
    private http:HttpClient,
    private langService : LangService,
    private contextoService: ContextoService,
    private snackBar: MatSnackBar) {}


  loginUser(username: string, password: string) {
    this.http.get<Resultado>(this.urlBase+"/login.php").subscribe(
      data=>{
        if(data.esValido)
        {
          this.token = "token";
            this.snackBar.open(this.langService.getLang(this.langService.modulos.Base, 'loginExitoso'), 'X',{
                duration: 2000,
                verticalPosition:'bottom', horizontalPosition:'right'
              });
              
              console.log(data.datoAdicional);
            this.contextoService.setContexto(data.datoAdicional);
            this.router.navigate(['menu']);
        }
        else{
            this.snackBar.open(this.langService.getLang(this.langService.modulos.Base, 'loginFallido'), null,{
                duration: 2000,
                verticalPosition:'bottom',   horizontalPosition:'right'
              });
        }
    })
  }

  logoutUser() {
    this.token = null;
    console.log("logout");
    this.http.post(this.urlBase+"/logout.php",null).subscribe((response)=>{
        return response;
    });
    this.snackBar.open(this.langService.getLang(this.langService.modulos.Base, 'loginCerrado'), null,{
      duration: 2000,
      verticalPosition:'bottom',   horizontalPosition:'right'
    });
    this.contextoService.finalizarContexto();
    this.router.navigate(['/login'])
  }

  getUserToken() {
    this.http.post(this.urlBase+"/token",null).subscribe((response:string)=>{
        console.log("response");
        this.token = response;
    });
    return this.token;
  }

  isUserAuthenticated() {
    return this.token != null;
  }
}
