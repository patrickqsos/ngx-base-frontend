import { Component, ViewChild, OnInit } from '@angular/core';
import { MatProgressBar } from '@angular/material';
import { ProgressInterceptor } from './../../shared/interceptors/progressbar.interceptor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
	selector: 'app-progress-bar',
	templateUrl : 'progressBar.component.html',
})
export class ProgressComponent implements OnInit {

	@ViewChild(MatProgressBar) private progressBar: MatProgressBar;

	progressPercentage$: Observable<number>;

	/**
	 * Creates an instance of ProgressComponent.
	 * @param {ProgressInterceptor} interceptor 
	 * @memberof ProgressComponent
	 */
	constructor(private interceptor: ProgressInterceptor) { }

	/**
	 * ngOnInit Funcion de angular que se ejecuta al momento
	 * de incializar el componente
	 * @memberof ProgressComponent
	 */
	ngOnInit() {
		this.progressPercentage$ = this.interceptor.progress$
									.map( progress => {
										if (progress === null) {
											this.progressBar.mode = 'indeterminate';
											return 100;
										} 
										else {
											this.progressBar.mode = 'determinate';
											return progress;
										}
									});
	}
}
