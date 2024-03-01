import { Component } from '@angular/core';
import { SearchComponent } from '../../shared/components/search/search.component';

interface Ticket {
  number: string;
  name: string;
  time: string;
  due: string;
  assignee: string;
  reportBy: string;
  status: string;
  priority: string;
}
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  tickets: Ticket[] = [
    {
      number: 'T001',
      name: 'Ticket 1',
      time: '12:00',
      due: '12:00',
      assignee: 'John Doe',
      reportBy: 'Jane Doe',
      status: 'Open',
      priority: 'High',
    },
    {
      number: 'T002',
      name: 'Ticket 2',
      time: '12:30',
      due: '12:30',
      assignee: 'John Smith',
      reportBy: 'Jane Smith',
      status: 'Open',
      priority: 'Medium',
    },
    {
      number: 'T003',
      name: 'Ticket 3',
      time: '13:00',
      due: '13:00',
      assignee: 'John Johnson',
      reportBy: 'Jane Johnson',
      status: 'Closed',
      priority: 'Low',
    },
    {
      number: 'T003',
      name: 'Ticket 3',
      time: '13:00',
      due: '13:00',
      assignee: 'John Johnson',
      reportBy: 'Jane Johnson',
      status: 'Pending Reply',
      priority: 'Low',
    },
    {
      number: 'T003',
      name: 'Ticket 3',
      time: '13:00',
      due: '13:00',
      assignee: 'John Johnson',
      reportBy: 'Jane Johnson',
      status: 'Taken',
      priority: 'Low',
    },
  ];
}
