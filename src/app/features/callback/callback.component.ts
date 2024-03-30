import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
})
export class CallbackComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.exchangeToken();
  }

  async exchangeToken() {
    const params = await firstValueFrom(this._route.queryParams);

    const code = params['code'];
    const org_id = params['org_id'];
    const state = params['state'];

    if (code && org_id && state) {
      const res = await firstValueFrom(
        this._authService.getToken(code, org_id, state),
      );
      localStorage.setItem('token', res.data.accessToken);
    } else {
      console.error('Missing required query parameters.');
    }
    window.location.href = '/';
  }
}
