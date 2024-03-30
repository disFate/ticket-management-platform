import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { URL } from '../../shared/constant/url.constant';
import { CurrentUser } from '../model/core.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private _http: HttpClient) {}
  getToken(code: string, orgId: string, state: string): Observable<any> {
    const url = environment.baseUrl + URL.getToken;
    const headers = {
      'Content-Type': 'application/json',
    };
    return this._http.post<any>(
      url,
      {
        code,
        state,
        redirectUri: environment.authRedirectUrl,
        orgId,
      },
      { headers },
    );
  }

  fetchCurrentUser(): Observable<CurrentUser> {
    const url = environment.baseUrl + URL.getCurrentUser;
    return this._http.get<{ data: CurrentUser }>(url).pipe(
      map((response) => {
        this._currentUserSubject.next(response.data);
        return response.data;
      }),
    );
  }

  get currentUser(): Observable<CurrentUser> {
    return this._currentUserSubject.asObservable();
  }

  getLogoutUrl(): Observable<any> {
    const url = environment.baseUrl + URL.getLogoutUrl;
    return this._http.post<any>(url, {}, {});
  }
}
