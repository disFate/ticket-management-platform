import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../../core/core.module';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    SidebarModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
