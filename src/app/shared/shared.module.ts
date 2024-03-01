import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ButtonModule, RouterModule.forChild(routes)],
  exports: [PageNotFoundComponent],
})
export class SharedModule {}
