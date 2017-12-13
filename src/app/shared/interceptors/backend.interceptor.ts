import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpResponse, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { JwtService } from "../services/jwt.service";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { NotificacionService } from "../services/notificacion.service";
import { eTipoNotificacion } from "../enums/tipo-notificacion.enum";
import { Injector } from "@angular/core";
import { ContextoService } from "../services/contexto.service";
import { LangService } from "../services/lang.service";
import { eModulo } from "../enums/modulo.enum";
import { Resultado } from "../models/resultado.model";

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    // Servicios.
    private notificacionService: NotificacionService;
    private contextoService: ContextoService;
    private langService: LangService;

    /**
     * Creates an instance of BackendInterceptor.
     * @param {JwtService} jwtService 
     * @param {Injector} inj 
     * @memberof BackendInterceptor
     */
    constructor(
        private jwtService: JwtService,
        private inj: Injector
    ) {}

    /**
     * Método intercept.
     * 
     * @param {HttpRequest<any>} req 
     * @param {HttpHandler} next 
     * @returns {Observable<HttpEvent<any>>} 
     * @memberof BackendInterceptor
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Inyecta servicios.
        // No se inyecta en el constructor debido a que eso genera una dependencia ciclica. 
        // https://github.com/angular/angular/issues/18224
        this.notificacionService = this.inj.get(NotificacionService);
        this.contextoService = this.inj.get(ContextoService);
        this.langService = this.inj.get(LangService);
        
        // clona el request y adiciona headers.
        let reqClone = req.clone({
            headers : this.getHeaders()
        })

        // Continua con el request clonado.
        return next
            .handle(reqClone)
            .do(event => {
                if (event instanceof HttpResponse) {
                    // Valida si el body tiene un mensaje para notificarlo.
                    if(event.body.message)
                    {
                        this.notificacionService.showSnackbarMensaje(event.body.message, 3000, eTipoNotificacion.Correcto);
                    }
                }
            })
            .catch(event => {
                if (event instanceof HttpErrorResponse) {
                    // Notifica el mensaje del response.
                    if(event.error.message) {
                        this.notificacionService.showSnackbarMensaje(event.error.message, 3000, this.getTipoNotificacion(event.status));
                    }
                    else if(event.error && event.error.error && event.error.error.message){
                        this.notificacionService.showSnackbarMensaje(event.error.error.message, 3000, eTipoNotificacion.Incorrecto);
                    }
                    else {
                        this.notificacionService.showSnackbarMensaje(this.langService.getLang(eModulo.Base, 'msg-network-error'), 3000, eTipoNotificacion.Incorrecto);
                    }
                }
                // Dispara el error en el observable.
                return Observable.throw(event);
            });
    }

    /**
     * Método para obtener headers.
     * 
     * @returns {HttpHeaders} Headers.
     * @memberof BackendInterceptor
     */
    getHeaders(): HttpHeaders {
        // Instancia httpheaders.
        let headers = new HttpHeaders;

        // Adiciona headers.
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Accept-Language', this.contextoService.getIdiomaActual());
        headers = headers.set('Content-Type', 'application/json');

        // Obtiene el token con el servicio jwt.
        const token = this.jwtService.getToken(); 

        // Si pudo obtener un token, adiciona el header de autorizacion.
        if (token) 
            headers = headers.set('Authorization', 'Bearer ' + token);

        // Retorna headers.
        return headers;
    }

    /**
     * Método para obtener el tipo de notificación en base al status code del response.
     * 
     * @param {number} pStatus Status code.
     * @returns {eTipoNotificacion} Tipo de Notificación.
     * @memberof BackendInterceptor
     */
    getTipoNotificacion(pHttpStatus: number): eTipoNotificacion {
        // Variable para el tipo de notificación.
        let tipoNotificacion: eTipoNotificacion;

        // En base al status code asigna un tipo de notificación.
        switch(pHttpStatus){
            case 200: 
            case 201:
            case 204:
                tipoNotificacion = eTipoNotificacion.Correcto;
                break;
            case 400:
            case 401:
            case 403:
            case 404:
            case 409:
            case 422:
                tipoNotificacion = eTipoNotificacion.Advertencia;
                break;
            case 500:
                tipoNotificacion = eTipoNotificacion.Incorrecto;
                break;
            default:
                tipoNotificacion = eTipoNotificacion.Incorrecto;
                break;
        }
        // Retorna el tipo de notificación.
        return tipoNotificacion;
    }
}