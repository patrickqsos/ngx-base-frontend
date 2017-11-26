import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LangService } from '../services/lang.service';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent extends BaseComponent{

    usuario = new FormControl('', [Validators.required, Validators.minLength(5)]);
    password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    constructor(
        public langService: LangService,
        private authService: AuthService
    ) {super();}

    login() {
        this.authService.loginUser(this.usuario.value, this.password.value);
    }
}