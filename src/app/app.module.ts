import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_INITIALIZER } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';

/* Import Angular Material Module*/
import { 
	MatInputModule, 
	MatFormFieldModule,
	MatToolbarModule,
	MatButtonModule,
	MatCardModule,
	MatSnackBarModule,
	MatExpansionModule,
	MatSlideToggleModule
} from '@angular/material';

import {MatSelectModule} from '@angular/material/select';

/* Import Angular Animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Import base Layout */
import { BaseModule } from './base/base.module';

/* Import Routing system */
import { appRoutes } from './base/app.routing';

/* import Auth Service */
import { AuthService } from './base/services/AuthService.service';

/* import App Auth Service */
import { AuthGuardService } from './base/services/AuthGuard.service';

/* Import Angular Routes and Angular Router Module */
import { Routes, RouterModule } from '@angular/router';

/* Import Angular Material Flex Layout Module */
import { FlexLayoutModule } from '@angular/flex-layout';

/* Import HttpClient Module */
import { HttpClientModule } from '@angular/common/http';

/* Import Context Service */
import { ContextoService } from './base/services/contexto.service';
import { LangService } from './base/services/lang.service';


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
	HttpClientModule,
	MatExpansionModule,
	MatSlideToggleModule,
	MatSelectModule
  ],
  providers: [
	  AuthService, 
	  AuthGuardService, 
	  LangService,
	  ContextoService,
	  { provide: APP_INITIALIZER, useFactory: (contexto: ContextoService) => () => contexto.load(), deps: [ContextoService], multi: true }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
