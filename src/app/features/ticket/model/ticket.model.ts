export interface Assignee {
  id: string;
  name: string;
}

export interface ErrorField {
  name: string;
  value: string;
}

export interface TicketError {
  code: string;
  message: string;
  fields: ErrorField[];
}

export interface CommentCreatedBy {
  id: string;
  name: string;
}

export interface TicketComment {
  commentId: string;
  createdBy: CommentCreatedBy;
  content: string;
  lastModDateTime: string;
}

export interface Ticket {
  ticketId: string;
  ticketNumber: string;
  ticketName: string;
  description: string;
  reportBy: string;
  externalRefId: string;
  errors: TicketError[];
  reportDateTime: string;
  dueDateTime: string;
  assignee: Assignee;
  status: string;
  priority: string;
  comments: TicketComment[];
}
