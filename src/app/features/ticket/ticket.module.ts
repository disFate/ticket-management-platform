import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { TableModule } from 'primeng/table';
import { SearchComponent } from '../../shared/components/search/search.component';
import { StatusCardComponent } from '../../shared/components/status-card/status-card.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
  },
];
@NgModule({
  declarations: [TicketComponent],
  imports: [
    CommonModule,
    TableModule,
    SearchComponent,
    StatusCardComponent,
    RouterModule.forChild(routes),
  ],
})
export class TicketModule {}
