export interface CurrentUser {
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email: string;
  scopes: string[];
}
export interface ticket {
  number?: string;
  name?: string;
  time?: string;
  due?: string;
  assignee?: string;
  reportBy?: string;
  status?: string;
  priority?: string;
  reference?: string;
  description?: string;
  id: string;
}
