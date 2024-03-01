import { MenuItem } from 'primeng/api';

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
