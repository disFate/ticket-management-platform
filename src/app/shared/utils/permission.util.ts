import { MenuItem } from 'primeng/api';
import { CurrentUser } from '../../core/model/core.model';
import { Ticket } from '../../features/ticket/model/ticket.model';
import { inject } from '@angular/core';
import { TicketService } from '../../features/ticket/service/ticket.service';
import { tick } from '@angular/core/testing';

export const ADMIN_SCOPES = [
  'ticket::Create',
  'ticket::Update-Priority',
  'user::*',
  'role::*',
  'ticket::Take',
  'ticket::View',
  'ticket::Untake',
  'ticket::Delete',
  'ticket::Assign',
  'dashboard::*',
];

export const MANAGER_SCOPES = [
  'ticket::Create',
  'ticket::Update-Priority',
  'ticket::Take',
  'ticket::View',
  'ticket::Untake',
  'ticket::Delete',
  'ticket::Assign',
  'dashboard::*',
];

export const AGENT_SCOPES = [
  'ticket::Take',
  'ticket::View',
  'ticket::Untake',
  'ticket::Assign',
];

export function getAvailableMenu(
  currentUser: CurrentUser,
  ticket: Ticket,
  ticketService: TicketService,
  showEditTicket: any,
  showTakeTicket: any,
): MenuItem[] {
  const items = [];
  if (ticket.status === 'Open') {
    items.push({
      label: 'Take',
      command: showTakeTicket,
    });
  } else {
    if (currentUser.userId === ticket?.assignee?.id) {
      items.push({
        label: 'Untake',
        command: showTakeTicket,
      });
    }
  }
  if (
    currentUser.scopes.some((scopes) => scopes === 'ticket::Update-Priority') ||
    currentUser.userId === ticket?.assignee?.id
  ) {
    items.push({
      label: 'Update Status',
      command: showEditTicket,
    });
  }
  if (
    currentUser.scopes.some((scopes) => scopes === 'ticket::Update-Priority')
  ) {
    items.push({
      label: 'Update Priority',
      command: () =>
        ticketService.updateTicket({ priority: ticket.priority }).subscribe(),
    });
    items.push({
      label: 'Update Assignee',
    });
  }
  if (currentUser.scopes.some((scopes) => scopes === 'ticket::Delete')) {
    items.push({
      label: 'Archive',
      command: () => ticketService.archiveTicket(ticket.ticketId).subscribe(),
    });
  }
  return items;
}

export function getAvailableNavItems(scopes: string[]): MenuItem[] {
  let items: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-table',
      routerLink: ['/dashboard'],
    },
    {
      label: 'Ticket Listing',
      icon: 'pi pi-fw pi-book',
      routerLink: ['/ticket'],
    },
  ];

  if (scopes.some((scope) => scope === 'user::*' || scope === 'role::*')) {
    items.push({
      label: 'Administration',
      icon: 'pi pi-fw pi-users',
      routerLink: ['/admin'],
    });
  }

  return items;
}
