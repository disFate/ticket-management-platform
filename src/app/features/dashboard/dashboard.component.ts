import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Ticket } from '../ticket/model/ticket.model';
import { PrioritySummary, StatusSummary } from './model/summary.model';
import { DashboardService } from './service/dashboard.service';
import { TicketService } from '../ticket/service/ticket.service';
import { User } from '../admin/model/admin.model';
import { AuthService } from '../../core/service/auth.service';
import { CurrentUser } from '../../core/model/core.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(
    private _dashboardService: DashboardService,
    private _ticketsService: TicketService,
    private _authService: AuthService,
  ) {}
  ngOnInit(): void {
    this._dashboardService.getPrioritySummary().subscribe((data) => {
      this.taskByPriority = data;
      this.formatChartData();
    });
    this._authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log('initialize dashbaord', this.currentUser);
    });
    const requestBody = {
      pageNum: 0,
      assigneeId: this.currentUser.userId,
      dueDateAt: new Date().toISOString().split('T')[0],
      pageSize: 10,
      sortCriteria: {
        field: 'dueDateTime',
        asc: false,
      },
    };
    console.log(requestBody);
    this._ticketsService.searchTickets(requestBody).subscribe((data) => {
      this.tickets = data.tickets;
    });
    this._dashboardService.getTicketSummary().subscribe((data) => {
      this.taskByStatus = data;
    });
  }

  tickets: Ticket[] = [];
  taskByPriority: PrioritySummary[] = [];
  formattedTaskByPriority: any;

  taskByStatus: StatusSummary[] = [];
  currentUser!: CurrentUser;

  formatChartData() {
    let labels = this.taskByPriority.map((d) => d.priority);
    let dataset = this.taskByPriority.map((d) => d.count);

    this.formattedTaskByPriority = {
      labels,
      datasets: [
        {
          data: dataset,
          backgroundColor: ['#35b90d', '#f05f05', '#f03b3b', '#e94bfa'],
        },
      ],
    };

    console.log(this.formattedTaskByPriority);
  }
}
