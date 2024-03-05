import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketComponent } from './ticket.component';
import { TableModule } from 'primeng/table';
import { SearchComponent } from '../../shared/components/search/search.component';
import { StatusCardComponent } from '../../shared/components/status-card/status-card.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';

import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CardModule } from 'primeng/card';
import { TicketUpdateComponent } from './ticket-update/ticket-update.component';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
  {
    path: '',
    component: TicketComponent,
  },
];
@NgModule({
  declarations: [TicketComponent, TicketDetailComponent, TicketUpdateComponent],
  imports: [
    CommonModule,
    TableModule,
    SearchComponent,
    StatusCardComponent,
    SidebarModule,
    DropdownModule,
    TagModule,
    FormsModule,
    StatusCardComponent,

    InputTextareaModule,
    ButtonModule,
    PanelModule,
    MessagesModule,
    PaginatorModule,
    MenuModule,
    OverlayPanelModule,
    CardModule,
    DialogModule,
    MessagesModule,
    RouterModule.forChild(routes),
  ],
})
export class TicketModule {}
