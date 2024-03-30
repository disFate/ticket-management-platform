import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../shared/components/search/search.component';
import { Assignee, Ticket } from './model/ticket.model';
import { TicketService } from './service/ticket.service';
import { TicketConfig } from './model/ticket-config.model';
import { SearchTicketsRequest } from './model/request.model';
import { MenuItem } from 'primeng/api';
import { ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Tick } from 'chart.js/dist/core/core.scale';
import { AuthService } from '../../core/service/auth.service';
import { getAvailableMenu } from '../../shared/utils/permission.util';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '../../core/model/core.model';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent implements OnInit {
  constructor(
    private _ticketService: TicketService,
    private _authServcie: AuthService,
  ) {}

  currentUser!: CurrentUser;
  tickets: Ticket[] = [];
  ticketConfig?: TicketConfig;

  updateStatusList: MenuItem[] = [
    {
      label: 'Closed',
      command: () => {
        this.newStatus = this;
      },
    },
    {
      label: 'Waiting for response',
      command: () => {
        this.newStatus = this;
      },
    },
  ];
  newStatus?: MenuItem;

  assignees?: Assignee[];

  sidebarVisible: boolean = false;
  updateStatusVisible: boolean = false;
  updateAssigneeVisible: boolean = false;
  updatePriorityVisible: boolean = false;
  archiveTicketVisible: boolean = false;
  takeTicketVisible: boolean = false;

  selectedAssignee?: Assignee;
  selectedStatus!: string;
  selectedPriority?: string;
  selectedReportBy?: string;
  selectedTicket!: Ticket;

  first: number = 0;
  totalRecords: number = 0;
  rowsPerPage: number = 10;

  searchContent?: string;

  menuItem: MenuItem[] = [];
  canEdit: boolean = false;

  showEditTicket(ticket: Ticket) {
    this.updateStatusVisible = true;
    this.selectedTicket = ticket;
  }

  showTakeTicket(ticket: Ticket) {
    this.takeTicketVisible = true;
    this.selectedTicket = ticket;
  }

  async updataTicket(body: any) {
    await firstValueFrom(this._ticketService.updateTicket(body));
    this.updateStatusVisible = false;
    this.onSearch(null);
  }

  async takeTicket() {
    if (this.selectedTicket.status === 'Open') {
      await firstValueFrom(
        this._ticketService.takeTicket(this.selectedTicket.ticketId),
      );
    } else {
      await firstValueFrom(
        this._ticketService.untakeTicket(this.selectedTicket.ticketId),
      );
    }

    this.takeTicketVisible = false;
    this.onSearch(null);
  }

  onSelectTicket(ticket: Ticket) {
    this.sidebarVisible = true;
    this._ticketService.getTicket(ticket.ticketId).subscribe((ticket) => {
      this.selectedTicket = ticket;
    });
  }

  async onSearch(searchContent: any) {
    const requestBody: SearchTicketsRequest = {
      pageNum: 0,
      pageSize: 10,
      searchContent: searchContent,
      sortCriteria: {
        field: 'dueDateTime',
        asc: false,
      },
    };
    const { tickets, totalFound } = await firstValueFrom(
      this._ticketService.searchTickets(requestBody),
    );
    this.tickets = tickets;
    this.totalRecords = totalFound;
  }

  onPageChange(event: any) {
    this.first = event.first;
    const requestBody: SearchTicketsRequest = {
      pageNum: event.first / this.rowsPerPage,
      pageSize: event.rows,
      reportBy: this.selectedReportBy,
      priority: this.selectedPriority,
      statusIn: this.selectedStatus ? [this.selectedStatus] : undefined,
      assigneeId: this.selectedAssignee?.id,
      sortCriteria: {
        field: 'dueDateTime',
        asc: false,
      },
    };
    this._ticketService.searchTickets(requestBody).subscribe((res) => {
      this.tickets = res.tickets;
      this.totalRecords = res.totalFound;
    });
  }

  checkEditPermission(ticket: Ticket): boolean {
    if (
      this.currentUser.scopes.includes('ticket::Update-Priority') ||
      this.currentUser.userId === ticket?.assignee?.id ||
      ticket.status === 'Open'
    ) {
      return false;
    }
    return true;
  }

  async onEditTicket(event: MouseEvent, op: any, ticket: Ticket) {
    console.log('onEditTicket', event, op, ticket);
    const currentUser = await firstValueFrom(this._authServcie.currentUser);
    this.menuItem = getAvailableMenu(
      currentUser,
      ticket,
      this._ticketService,
      () => this.showEditTicket(ticket),
      () => this.showTakeTicket(ticket),
      // this.updateStatusList,
      // this.assignees,
      // this.ticketConfig?.priorityList,
    );
    event.stopPropagation();
    op.toggle(event);
  }

  onFilterChange() {
    console.log('Filter changed');
    const requestBody: SearchTicketsRequest = {
      pageNum: 0,
      pageSize: 10,
      reportBy: this.selectedReportBy,
      priority: this.selectedPriority,
      statusIn: this.selectedStatus ? [this.selectedStatus] : undefined,
      assigneeId: this.selectedAssignee?.id,
      sortCriteria: {
        field: 'dueDateTime',
        asc: false,
      },
    };
    this._ticketService.searchTickets(requestBody).subscribe((res) => {
      this.tickets = res.tickets;
      this.totalRecords = res.totalFound;
    });
  }

  ngOnInit(): void {
    console.log('Ticket component initialized');
    const requestBody = {
      pageNum: 0,
      pageSize: 10,
      sortCriteria: {
        field: 'dueDateTime',
        asc: false,
      },
    };
    this._authServcie.currentUser.subscribe(
      (currentUser) => (this.currentUser = currentUser),
    );
    this._ticketService.searchTickets(requestBody).subscribe((res) => {
      this.tickets = res.tickets;
      this.totalRecords = res.totalFound;
    });
    this._ticketService.getTicketConfig().subscribe((res) => {
      this.ticketConfig = res;
    });
    this._ticketService.getAssignee().subscribe((res) => {
      this.assignees = res;
    });
  }
}
