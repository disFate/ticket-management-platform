import { environment } from './../environments/environment';
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { CoreModule } from './core/core.module'
import { AdminModule } from './features/admin/admin.module'
import { TicketListModule } from './features/ticket-list/ticket-list.module'
import { AppComponent } from './app.component'
import { AuthService } from './core/services/auth.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { InterceptorService } from './core/interceptors/token.interceptor'
import { AppRouteModule } from './app-route.module'
import { Location } from '@angular/common'
import { firstValueFrom } from 'rxjs'
import { LoadingService } from './core/services/loading.service'
import { SharedModule } from './shared/shared.module'
import { DynamicDialogModule } from 'primeng/dynamicdialog'

export function initializeApp (authService: AuthService, location: Location, loadingService: LoadingService) {
  return async (): Promise<any> => {
    console.log("initializeApp, " + environment.envName);
    loadingService.turnOnLoading();
    const currentPath = location.path()
    if (currentPath.startsWith('/callback')) {
      return
    }
    const user = await firstValueFrom(authService.fetchCurrentUser())
    authService.setCurrentUser(user)
    loadingService.turnOffLoading()
  }
}

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    AdminModule,
    TicketListModule,
    SharedModule,
    AppRouteModule,
    DynamicDialogModule
  ],

  declarations: [
    AppComponent
  ],
  providers: [
    AuthService,
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AuthService, Location, LoadingService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
