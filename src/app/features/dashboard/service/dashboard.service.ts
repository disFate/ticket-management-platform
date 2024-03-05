import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { URL } from '../../../shared/constant/url.constant';
import { PrioritySummary, StatusSummary } from '../model/summary.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  _headers: any = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  getPrioritySummary(): Observable<PrioritySummary[]> {
    return this._http
      .get<{
        data: PrioritySummary[];
      }>(URL.getPrioritySummary, { headers: this._headers })
      .pipe(map((response) => response.data));
  }

  getTicketSummary(): Observable<StatusSummary[]> {
    return this._http
      .get<{
        data: StatusSummary[];
      }>(URL.getStatusSummary, { headers: this._headers })
      .pipe(map((response) => response.data));
  }
}
