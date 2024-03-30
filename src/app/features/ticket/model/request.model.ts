export interface SearchTicketsRequest {
  pageNum: number;
  pageSize: number;
  priority?: string;
  statusIn?: string[];
  assigneeId?: string;
  dueDate?: string;
  reportBy?: string;
  reportEndDate?: string;
  sortCriteria: SortCriteria;
  searchContent?: string;
}

export interface SortCriteria {
  field?: string;
  asc?: boolean;
}
