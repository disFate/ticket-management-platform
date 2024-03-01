import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallbackComponent } from './callback.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CallbackComponent,
  },
];
@NgModule({
  declarations: [CallbackComponent],
  imports: [CommonModule],
})
export class CallbackModule {}
