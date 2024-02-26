/* eslint-disable @typescript-eslint/promise-function-async */
import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { CallbackComponent } from './core/components/callback/callback.component'
import { SharedModule } from './shared/shared.module'

const appRoutes: Routes = [
  {
    path: 'ticket-list',
    loadChildren: () => import('./features/ticket-list/ticket-list.module').then(m => m.TicketListModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashBoardModule)
  },
  { path: 'callback', component: CallbackComponent },
  {
    path: '**',
    redirectTo: 'page/not-found'
  }
]


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRouteModule {

}
