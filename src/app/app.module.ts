import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';

/* Import Angular Material Module*/
import { 
  MatInputModule, 
  MatFormFieldModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
	MatCardModule,
	MatSnackBarModule
	} from '@angular/material';

/* Import Angular Animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Import base Layout */
import { BaseModule } from './base/base.module';

/* Import Routing system */
import {appRoutes} from './base/app.routing';

/* import Auth Service */
import {AuthService} from './base/services/AuthService.service';

/* import App Auth Service */
import {AuthGuardService} from './base/services/AuthGuard.service';

/* Import Angular Routes and Angular Router Module */
import { Routes, RouterModule } from '@angular/router';

/* Import Angular Material Flex Layout Module */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Import HttpClient Module */
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
		AppComponent
  ],
  imports: [
	FormsModule,
	ReactiveFormsModule,
	BrowserModule,
	BrowserAnimationsModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatButtonModule,
	MatSnackBarModule,
	BaseModule,
	RouterModule.forRoot(appRoutes),
	MatToolbarModule,
	FlexLayoutModule,
	MatCardModule,
	HttpClientModule		
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
