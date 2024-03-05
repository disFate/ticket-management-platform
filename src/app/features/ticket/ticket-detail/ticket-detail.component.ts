import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Assignee, Ticket } from '../model/ticket.model';
import { ticket } from '../../../core/model/core.model';
import { TicketService } from '../service/ticket.service';
import { TicketConfig } from '../model/ticket-config.model';
import { tick } from '@angular/core/testing';
import { Dropdown, DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css',
})
export class TicketDetailComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('TicketDetailComponent ngOnChanges', this.ticket);
  }
  @Input('ticket') ticket?: Ticket;
  @Input('ticketConfig') ticketConfig?: TicketConfig;
  @Input('assigneeList') assigneeList?: Assignee[];
  @Output('updateSidebar') updateValue = new EventEmitter<any>();

  ngOnInit(): void {
    console.log('TicketDetailComponent initialized');
  }

  onEditStatus(event: DropdownChangeEvent) {
    event.originalEvent.stopPropagation();
    this.updateValue.emit({ status: event.value });
    console.log(event);
  }

  onEditPriority(event: DropdownChangeEvent) {
    event.originalEvent.stopPropagation();
    this.updateValue.emit({ priority: event.value });
    console.log(event);
  }

  onEditAssignee(event: DropdownChangeEvent) {
    event.originalEvent.stopPropagation();
    this.updateValue.emit({ assignee: event.value });
    console.log(event);
  }
}
