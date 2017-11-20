import { Injectable } from '@angular/core';
import { lang } from './lang';

@Injectable()
export class MensajesService {
    private language: string = '';
    private mensajes =
        {
            'es': {
                'usuarioLogin': 'Por favor introduzca un usuario valido.',
                'usuarioFormLabel': 'Usuario',
                'usuarioHintLabel' : 'Ingrese el nombre de usuario.',
                'passwordLogin': 'Por favor introduzca un password valido.',
                'passwordFormLabel': 'Contrasena',
                'passwordHintLabel': 'Ingrese la contrasena',
                'btnLogin' : 'Ingresar',
                'btnCancel' : 'Cancelar',
                'loginFallido': 'Contrasena y/o usuario incorrectos. Por favor intente de nuevo.',
                'loginExitoso': 'Autenticacion exitosa.',
                'loginMensaje': 'Iniciar Sesion',
                'logoutMensaje': 'Cerrar Sesion',
                'tit-autenticacion': 'Autenticación',
                'loginCerrado': 'Su sesion ha sido cerrada.'
            },
            'en': {
                'usuarioLogin': 'Please enter a valid username',
                'usuarioFormLabel': 'Username',
                'usuarioHintLabel' : 'Enter the username',
                'passwordLogin': 'Please enter a valid password',
                'passwordFormLabel': 'Password',
                'passwordHintLabel': 'Min 6 characters',
                'btnLogin': 'Log In',
                'btnCancel' : 'Cancel',
                'loginFallido' : 'Incorrect password or username entered. Please try again.',
                'loginExitoso' : 'Log in successfully',
                'loginMensaje': 'Log In',
                'logoutMensaje': 'Log Out',
                'tit-autenticacion': 'Login',
                'loginCerrado': 'Log out successfully'
            }
        };


    constructor() {
        this.language = lang;
    }

    setNuevoLanguage(pNuevoLanguage: string) {
        this.language = pNuevoLanguage;
    }
    getMsn(id: string) {
        return this.mensajes[this.language][id];
    }
}
