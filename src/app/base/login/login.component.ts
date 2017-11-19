import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { MensajesService} from '../parametros/mensajesServices';
import { AuthService } from '../services/AuthService.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent{

    usuario = new FormControl('', [Validators.required, Validators.minLength(5)]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(private msn: MensajesService, private http: AuthService) {}

    mensaje(msn: string) {
        return this.msn.getMsn(msn);
    }

    login() {
        this.http.loginUser(this.usuario.value, this.password.value);
    }
}