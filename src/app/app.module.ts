import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseModule } from './base/base.module';
import { appRoutes } from './app.routing';
import { AuthService } from './shared/services/auth.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { ContextoService } from './shared/services/contexto.service';
import { LangService } from './shared/services/lang.service';
import { UtilService } from './shared/services/util.service';
import { NotificacionService } from './shared/services/notificacion.service';
import { JwtService } from './shared/services/jwt.service';
import { BackendInterceptor } from './shared/interceptors/backend.interceptor';
import { MatPaginatorIntl } from '@angular/material';
import { CustomMatPaginator } from './shared/custom.matpaginator';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { LayoutComponent } from './base/layout/layout.component';

registerLocaleData(localeEs);

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        BaseModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AuthService,
        AuthGuardService,
        LangService,
        ContextoService,
        UtilService,
        NotificacionService,
        {
            provide: APP_INITIALIZER,
            useFactory: (contexto: ContextoService) => () => contexto.load(),
            deps: [ContextoService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: BackendInterceptor,
            multi: true
        },
        JwtService,
        {
            provide:  MatPaginatorIntl,
            useClass:  CustomMatPaginator
        },
        {
            provide: LOCALE_ID,
            useValue: 'es'
        }
    ],
    bootstrap: [
        LayoutComponent
    ],
    exports: []
})
export class AppModule {}
