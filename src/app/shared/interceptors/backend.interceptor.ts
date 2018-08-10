import { Observable ,  ReplaySubject ,  Subject, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {    HttpInterceptor,
            HttpRequest,
            HttpHandler,
            HttpEvent,
            HttpEventType,
            HttpResponse,
            HttpErrorResponse,
            HttpHeaders } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { NotificacionService } from '../services/notificacion.service';
import { eTipoNotificacion } from '../enums/tipo-notificacion.enum';
import { ContextoService } from '../services/contexto.service';
import { LangService } from '../services/lang.service';
import { eModulo } from '../enums/modulo.enum';
import { Resultado } from '../models/resultado.model';

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

        // Verifica si existen los parametros para ocultar el progressbar/notificador.
        const showProgressBar = !req.headers.has('X-ProgressBar');
        const showNotificador = !req.headers.has('X-Notificador');

        // Clona el request y adiciona headers.
        const reqClone = req.clone({
            params: req.params,
            headers : this.getHeaders(req.headers),
            reportProgress: showProgressBar
        });

        return next
            .handle(reqClone).pipe(
                tap((event: HttpEvent<any>) => {
                    switch (event.type) {
                        case HttpEventType.Sent:
                            // Cambia el estado a true cuando se ejecuta una peticion http al backend
                            this.contextoService.isLoading = true;
                            // Continua con el request clonado.
                            if (showProgressBar) {
                                // Hace aparecer un progressbar indeterminado.
                                this.notificacionService.progressSubject.next(undefined);
                            }
                            break;
                        case HttpEventType.DownloadProgress:
                            // Si el response especifica su tamaño, se calcula el valor del progressbar.
                            if (event.total && showProgressBar) {
                                this.notificacionService.progressSubject.next(Math.round((event.loaded / event.total) * 100));
                            }
                            break;
                        case HttpEventType.UploadProgress:
                            // No se notifica el upload.
                            // if (event.total) {
                            // 	this.notificacionService.progressSubject.next(Math.round((event.loaded / event.total) * 100));
                            // }
                            break;
                        case HttpEventType.Response:
                            // Notifica mensaje.
                            if (event.body.message && showNotificador) {
                                this.notificacionService.showSnackbarMensaje(event.body.message, 3000, eTipoNotificacion.Correcto);
                            }
                            break;
                        default:
                            break;
                    }
                }),
                catchError(event => {
                    if (event instanceof HttpErrorResponse) {
                        // En event.error deberia esta la entidad result del backend.

                        // Si el result tiene la propiedad error.
                        if (event.error.error) {
                            this.notificacionService.showSnackbarConBoton(event.error, eTipoNotificacion.Incorrecto);
                        } else if (event.error.message) {
                            this.notificacionService.showSnackbarMensaje(event.error.message, 3000, this.getTipoNotificacion(event.status));
                        } else {
                            const url = reqClone.url.split('?');
                            // tslint:disable-next-line:max-line-length
                            this.notificacionService.showSnackbarMensaje(`${this.langService.getLang(eModulo.Base, 'msg-network-error')}${url[0]}`, 5000, eTipoNotificacion.Incorrecto);
                        }
                    }
                    // Dispara el error en el observable.
                    return throwError(event);
                }),
                finalize(() => {
                    this.contextoService.isLoading = false;
                    this.notificacionService.progressSubject.next(0);
                })
            );
    }

    /**
     * Método para obtener headers.
     *
     * @returns {HttpHeaders} Headers.
     * @memberof BackendInterceptor
     */
    getHeaders(pReqHeaders: HttpHeaders): HttpHeaders {
        // Adiciona headers.
        pReqHeaders = pReqHeaders.set('Accept-Language', this.contextoService.idiomaSeleccionado);

        if (!pReqHeaders.has('Content-Type')) {
            pReqHeaders = pReqHeaders.set('Content-Type', 'application/json; charset=utf-8');
        }
        if (!pReqHeaders.has('Accept')) {
            pReqHeaders = pReqHeaders.set('Accept', 'application/json; charset=utf-8');
        }
        if (pReqHeaders.has('X-Notificador')) {
            pReqHeaders = pReqHeaders.delete('X-Notificador');
        }

        if (pReqHeaders.has('X-ProgressBar')) {
            pReqHeaders = pReqHeaders.delete('X-ProgressBar');
        }

        // Obtiene el token con el servicio jwt.
        const token = this.jwtService.getToken();

        // Si pudo obtener un token, adiciona el header de autorizacion.
        if (token) {
            pReqHeaders = pReqHeaders.set('Authorization', `Bearer ${token}`);
        }

        // Retorna headers.
        return pReqHeaders;
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
        switch (pHttpStatus) {
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
