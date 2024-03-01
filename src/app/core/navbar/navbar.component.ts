import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { CurrentUser } from '../model/core.model';
import { getAvailableNavItems } from '../../shared/utils/permission.util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  authService: AuthService = inject(AuthService);

  items!: MenuItem[];
  private _unsubscribeAll = new Subject<any>();

  ngOnInit(): void {
    this.authService.currentUser
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next: (currentUser: CurrentUser) => {
          this.items = getAvailableNavItems(currentUser.scopes);
          this.items.push({
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-out',
            style: { 'margin-left': 'auto' },
            command: () => {
              this.logout();
            },
          });
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  logout(): void {
    this.authService.getLogoutUrl().subscribe((data) => {
      const logoutUrl = data?.data;
      if (logoutUrl) {
        window.location.href = logoutUrl;
      }
    });
  }
}
