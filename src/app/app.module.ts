import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';

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

import { BaseModule } from './base/base.module';
import { appRoutes } from './app.routing';
import { AuthService } from './base/services/auth.service';
import { AuthGuardService } from './base/services/auth-guard.service';
import { ContextoService } from './base/services/contexto.service';
import { LangService } from './base/services/lang.service';
import { UtilService } from './base/services/util.service';
import { NotificacionService } from './base/services/notificacion.service';

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
	  UtilService,
	  NotificacionService,
	  { provide: APP_INITIALIZER, useFactory: (contexto: ContextoService) => () => contexto.load(), deps: [ContextoService], multi: true }],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {}
