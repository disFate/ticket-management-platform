import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AppRouteModule } from './app-router.module';
import { AuthService } from './core/service/auth.service';
import { environment } from '../environments/environment';
import { Location } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './core/interceptor/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketModule } from './features/ticket/ticket.module';
import { AdminModule } from './features/admin/admin.module';
import { CoreModule } from './core/core.module';

export function initializeApp(authService: AuthService, location: Location) {
  return async (): Promise<any> => {
    console.log('initializeApp, ' + environment.envName);
    const currentPath = location.path();

    if (currentPath.startsWith('/callback')) {
      const url = document.location.href;
      const urlObj = new URL(url);
      const searchParams = urlObj.searchParams;

      const code = searchParams.get('code');
      const org_id = searchParams.get('org_id');
      const state = searchParams.get('state');

      if (code && org_id && state) {
        const res = await firstValueFrom(
          authService.getToken(code, org_id, state),
        );
        localStorage.setItem('token', res.data.accessToken);
        window.location.href = '/dashboard';
      } else {
        console.error('Missing required query parameters.');
      }

      return;
    }
    const user = await firstValueFrom(authService.fetchCurrentUser());
    console.log('User: ', user);
  };
}

@NgModule({
  imports: [
    BrowserModule,
    DynamicDialogModule,
    TicketModule,
    AdminModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRouteModule,
    CoreModule,
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, Location],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
