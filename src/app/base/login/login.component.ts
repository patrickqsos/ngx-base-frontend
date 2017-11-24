import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/AuthService.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LangService } from '../services/lang.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent{

    usuario = new FormControl('', [Validators.required, Validators.minLength(5)]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(public langService: LangService, private http: AuthService) {}

    login() {
        this.http.loginUser(this.usuario.value, this.password.value);
    }
}