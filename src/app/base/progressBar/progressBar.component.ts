import { ProgressBarColor } from './progressBar.component';
import { MatProgressBar } from '@angular/material';
import { ProgressInterceptor } from './../../shared/interceptors/progressbar.interceptor';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Component, Input, ViewChild, OnInit } from '@angular/core';

export type ProgressBarColor = 'primary' | 'accent' | 'warn';
type ProgressBarMode = 'determinate' | 'indeterminate' | 'buffer' | 'query';

@Component({
	selector: 'app-progress-bar',
	templateUrl : 'progressBar.component.html',
})
export class ProgressComponent implements OnInit {
	@Input() color: ProgressBarColor = 'accent';

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

						if ( progress === null) {
								console.log(progress);
								this.setMode('indeterminate');
								return 0;
						 } else {
								this.setMode('determinate');
								return progress;
						}
				});
	}

	private setMode(mode: ProgressBarMode) {
		this.progressBar.mode = mode;
	}
	private setColor(pColor: ProgressBarColor) {
		this.progressBar.color = pColor;
	}
}
