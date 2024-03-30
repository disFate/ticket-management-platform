import { environment } from './../environments/environment';
import { Component, type OnInit } from '@angular/core';
import { AuthService } from './core/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService) {}
  showNavbar: boolean = false;
  ngOnInit(): void {
    this._authService.currentUser.subscribe({
      next: (currentUser) => {
        this.showNavbar = !!currentUser;
      },
    });
    console.log('AppComponent initialized' + environment.envName);
  }
}
