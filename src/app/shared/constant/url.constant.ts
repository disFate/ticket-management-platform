export const URL = {
  //users
  searchUsers: '/exception/api/v1/user/search',
  updateUserRole: '/exception/api/v1/user/role',
  getUserRoles: '/exception/api/v1/role',
  //auth
  getToken: '/exception/api/v1/auth/token',
  getCurrentUser: '/exception/api/v1/current',
  getLogoutUrl: '/exception/api/v1/auth/logout',

  //tikcet
  searchTickets: '/exception/api/v1/ticket/search',
  getTicket: '/exception/api/v1/ticket',
  getAssignee: '/exception/api/v1/ticket/assignee',
  getTicketConfig: '/exception/api/v1/ticket-config',
  updateTicket: '/exception/api/v1/ticket',

  //dashboard
  getPrioritySummary: '/exception/api/v1/user/ticket/priority-summary',
  getStatusSummary: '/exception/api/v1/user/ticket/status-summary',
};
