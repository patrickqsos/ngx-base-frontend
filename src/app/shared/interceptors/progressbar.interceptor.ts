import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class ProgressInterceptor implements HttpInterceptor {
	public progress$: Observable<number | null>;
	private progressSubject: Subject<number | null>;

	/**
	 * Creates an instance of ProgressInterceptor.
	 * @memberof ProgressInterceptor
	 */
	constructor() {
		this.progressSubject = new ReplaySubject<number | null>(1);
		this.progress$ = this.progressSubject.asObservable();
	}

	/**
	 * Funcion intercept que permite interceptar las peticiones del sistema y mostrar el progressBar
	 *
	 * @template T
	 * @param {HttpRequest<T>} req
	 * @param {HttpHandler} next
	 * @returns {Observable<HttpEvent<T>>}
	 * @memberof ProgressInterceptor
	 */
	intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
		const reportingRequest = req.clone({ reportProgress: true });
		return next
			.handle(req)
			.do((event: HttpEvent<T>) => {
				switch (event.type) {
					case HttpEventType.Sent:
						this.progressSubject.next(null);
						break;
					case HttpEventType.DownloadProgress:
					case HttpEventType.UploadProgress:
						if (event.total) {
							this.progressSubject.next(Math.round((event.loaded / event.total) * 100));
						}
						break;
					case HttpEventType.Response:
						this.progressSubject.next(0);
						break;
				}
			})
			.catch(error => {
				this.progressSubject.next(0);
				return Observable.throw(error);
			});
	}
}
