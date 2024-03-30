import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Assignee, Ticket } from '../model/ticket.model';
import { URL } from '../../../shared/constant/url.constant';
import { SearchTicketsRequest } from '../model/request.model';
import { TicketConfig } from '../model/ticket-config.model';
import { truncateString } from '../../../shared/utils/tools.util';
import { Tick } from 'chart.js/dist/core/core.scale';
import { tick } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private _http: HttpClient) {}

  _headers: any = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  searchTickets(
    requestBody: SearchTicketsRequest,
  ): Observable<{ totalFound: number; tickets: Ticket[] }> {
    return this._http
      .post<{
        data: { totalFound: number; tickets: Ticket[] };
      }>(URL.searchTickets, requestBody, { headers: this._headers })
      .pipe(
        map((response) => response.data),
        map((data) => ({
          totalFound: data.totalFound,
          tickets: data.tickets.map((ticket) => ({
            ...ticket,
            ticketName: truncateString(ticket.ticketName, 50),
          })),
        })),
      );
  }

  getTicket(ticketId: string): Observable<Ticket> {
    return this._http
      .get<{
        data: Ticket;
      }>(`${URL.getTicket}/${ticketId}`, { headers: this._headers })
      .pipe(map((response) => response.data));
  }

  getTicketConfig(): Observable<TicketConfig> {
    return this._http
      .get<{
        data: TicketConfig;
      }>(URL.getTicketConfig, { headers: this._headers })
      .pipe(map((response) => response.data));
  }

  getAssignee(): Observable<Assignee[]> {
    return this._http
      .get<{
        data: { id: string; firstName: string; lastName: string }[];
      }>(URL.getAssignee, { headers: this._headers })
      .pipe(
        map((response) => response.data),
        map((assignees) =>
          assignees.map((assignee) => ({
            id: assignee.id,
            name: `${assignee.firstName} ${assignee.lastName}`,
          })),
        ),
      );
  }

  takeTicket(ticketId: string): Observable<any> {
    return this._http
      .patch<any>(
        `${URL.updateTicket}/${ticketId}/take`,
        { take: true },
        { headers: this._headers },
      )
      .pipe(map((response) => response.data));
  }

  untakeTicket(ticketId: string): Observable<any> {
    return this._http
      .patch<any>(
        `${URL.updateTicket}/${ticketId}/take`,
        { take: false },
        { headers: this._headers },
      )
      .pipe(map((response) => response.data));
  }

  updateTicket(ticket: any): Observable<any> {
    return this._http
      .patch<any>(`${URL.updateTicket}/${ticket.ticketId}/assign`, ticket, {
        headers: this._headers,
      })
      .pipe(map((response) => response.data));
  }

  archiveTicket(ticketId: string): Observable<any> {
    return this._http.patch<any>(`${URL.updateTicket}/${ticketId} + /archive`, {
      headers: this._headers,
    });
  }
}
