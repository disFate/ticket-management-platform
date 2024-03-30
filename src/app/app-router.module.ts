import { NgModule } from '@angular/core';
import { RouterModule, type Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'ticket',
    loadChildren: () =>
      import('./features/ticket/ticket.module').then((m) => m.TicketModule),
  },
  {
    path: 'page',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'callback',
    loadChildren: () =>
      import('./features/callback/callback.module').then(
        (m) => m.CallbackModule,
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'page/not-found',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRouteModule {}
